"""Social media username availability checks.

Platforms split into two groups: ones whose public profile URLs answer
anonymous requests with a clean 404 for free handles (checked live), and
ones behind login walls or bot detection (we validate the handle format
and hand back the profile URL to check manually).
"""
from __future__ import annotations

import asyncio
import re

import httpx

CHECK_TIMEOUT = 5.0
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/130.0 Safari/537.36"
)

#: Platforms we can probe anonymously: profile URL template + handle rules.
PROBED_PLATFORMS = {
    "github": {
        "label": "GitHub",
        "url": "https://github.com/{handle}",
        "pattern": re.compile(r"^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){0,38}$"),
    },
    "youtube": {
        "label": "YouTube",
        "url": "https://www.youtube.com/@{handle}",
        "pattern": re.compile(r"^[a-z0-9._-]{3,30}$"),
    },
    "pinterest": {
        "label": "Pinterest",
        "url": "https://www.pinterest.com/{handle}/",
        "pattern": re.compile(r"^[a-z0-9_]{3,30}$"),
    },
}

#: Platforms behind login walls / bot detection: format check + manual link.
MANUAL_PLATFORMS = {
    "instagram": {
        "label": "Instagram",
        "url": "https://www.instagram.com/{handle}/",
        "pattern": re.compile(r"^[a-z0-9._]{1,30}$"),
    },
    "x": {
        "label": "X (Twitter)",
        "url": "https://x.com/{handle}",
        "pattern": re.compile(r"^[a-z0-9_]{4,15}$"),
    },
    "linkedin": {
        "label": "LinkedIn",
        "url": "https://www.linkedin.com/company/{handle}/",
        "pattern": re.compile(r"^[a-z0-9-]{3,100}$"),
    },
    "facebook": {
        "label": "Facebook",
        "url": "https://www.facebook.com/{handle}",
        "pattern": re.compile(r"^[a-z0-9.]{5,50}$"),
    },
}


def normalize_handle(name: str) -> str:
    return re.sub(r"[^a-z0-9]", "", name.lower())[:30]


async def _probe(client: httpx.AsyncClient, key: str, cfg: dict, handle: str) -> dict:
    url = cfg["url"].format(handle=handle)
    base = {"platform": key, "label": cfg["label"], "handle": handle, "url": url}
    if not cfg["pattern"].match(handle):
        return {**base, "status": "invalid"}
    try:
        resp = await client.get(url, follow_redirects=True)
    except httpx.HTTPError:
        return {**base, "status": "unknown"}
    if resp.status_code == 404:
        return {**base, "status": "available"}
    if resp.status_code == 200:
        return {**base, "status": "taken"}
    return {**base, "status": "unknown"}


def _manual(key: str, cfg: dict, handle: str) -> dict:
    url = cfg["url"].format(handle=handle)
    base = {"platform": key, "label": cfg["label"], "handle": handle, "url": url}
    if not cfg["pattern"].match(handle):
        return {**base, "status": "invalid"}
    return {**base, "status": "manual"}


async def check_usernames(name: str) -> dict:
    """Check `name` as a handle across all platforms. Never raises."""
    handle = normalize_handle(name)
    if not handle:
        return {"handle": "", "results": []}

    async with httpx.AsyncClient(
        timeout=CHECK_TIMEOUT, headers={"User-Agent": USER_AGENT}
    ) as client:
        probed = await asyncio.gather(
            *(_probe(client, key, cfg, handle) for key, cfg in PROBED_PLATFORMS.items())
        )
    manual = [_manual(key, cfg, handle) for key, cfg in MANUAL_PLATFORMS.items()]
    return {"handle": handle, "results": list(probed) + manual}
