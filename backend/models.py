from pydantic import BaseModel
from typing import List, Optional

class SlideContent(BaseModel):
    layout_hint: str
    title: str
    bullets: List[str]
    notes: Optional[str] = None

class SlidePlan(BaseModel):
    slides: List[SlideContent]
    max_bullets_per_slide: int = 5
    max_words_per_bullet: int = 12
