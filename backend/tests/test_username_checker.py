from __future__ import annotations

import httpx
import pytest

from app.services.username_checker import check_usernames, normalize_handle


def test_normalize_handle_strips_and_lowercases():
    assert normalize_handle("My Brand Co.") == "mybrandco"
    assert normalize_handle("  Tech-Nova_1 ") == "technova1"
    assert normalize_handle("!!!") == ""


class FakeResponse:
    def __init__(self, status_code, url="https://example.com/x"):
        self.status_code = status_code
        self.url = url


@pytest.fixture
def fake_http(monkeypatch):
    """Patch httpx.AsyncClient.get to a canned per-URL status map."""
    statuses = {}

    async def fake_get(self, url, **kwargs):
        result = statuses.get(url, 404)
        if isinstance(result, Exception):
            raise result
        if isinstance(result, FakeResponse):
            return result
        return FakeResponse(result)

    monkeypatch.setattr(httpx.AsyncClient, "get", fake_get)
    return statuses


@pytest.mark.asyncio
async def test_probed_platforms_map_status_codes(fake_http):
    fake_http["https://github.com/mybrand"] = 200
    fake_http["https://www.youtube.com/@mybrand"] = 404

    data = await check_usernames("MyBrand")
    by_platform = {r["platform"]: r for r in data["results"]}

    assert data["handle"] == "mybrand"
    assert by_platform["github"]["status"] == "taken"
    assert by_platform["youtube"]["status"] == "available"


@pytest.mark.asyncio
async def test_probe_errors_and_consent_walls_are_unknown(fake_http):
    fake_http["https://github.com/mybrand"] = httpx.ConnectTimeout("slow")
    fake_http["https://www.youtube.com/@mybrand"] = FakeResponse(
        200, url="https://consent.youtube.com/m?continue=x"
    )

    data = await check_usernames("MyBrand")
    by_platform = {r["platform"]: r for r in data["results"]}

    assert by_platform["github"]["status"] == "unknown"
    assert by_platform["youtube"]["status"] == "unknown"


@pytest.mark.asyncio
async def test_manual_platforms_get_profile_links(fake_http):
    data = await check_usernames("mybrand")
    by_platform = {r["platform"]: r for r in data["results"]}

    for key in ("pinterest", "instagram", "x", "linkedin", "facebook"):
        assert by_platform[key]["status"] == "manual"
        assert "mybrand" in by_platform[key]["url"]


@pytest.mark.asyncio
async def test_too_long_handle_is_invalid_for_x(fake_http):
    # 20 chars: fine for github/instagram, too long for X's 15-char cap.
    data = await check_usernames("a" * 20)
    by_platform = {r["platform"]: r for r in data["results"]}
    assert by_platform["x"]["status"] == "invalid"


@pytest.mark.asyncio
async def test_empty_after_normalization():
    data = await check_usernames("!!!")
    assert data == {"handle": "", "results": []}


def test_router_endpoint(client, fake_http):
    resp = client.post("/api/social/check", json={"name": "MyBrand"})
    assert resp.status_code == 200
    body = resp.json()
    assert body["handle"] == "mybrand"
    platforms = {r["platform"] for r in body["results"]}
    assert {"github", "youtube", "instagram", "x"} <= platforms


def test_router_rejects_empty_name(client):
    resp = client.post("/api/social/check", json={"name": ""})
    assert resp.status_code == 422
