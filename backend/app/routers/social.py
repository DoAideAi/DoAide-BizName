"""Public social media username checker — no login required."""
from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.services.username_checker import check_usernames

router = APIRouter(prefix="/api/social", tags=["social"])


class UsernameCheckRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)


class UsernameResult(BaseModel):
    platform: str
    label: str
    handle: str
    url: str
    #: available | taken | unknown | manual | invalid
    status: str


class UsernameCheckResponse(BaseModel):
    handle: str
    results: list[UsernameResult]


@router.post("/check", response_model=UsernameCheckResponse)
async def check_social_usernames(body: UsernameCheckRequest):
    data = await check_usernames(body.name)
    return UsernameCheckResponse(**data)
