import httpx
from .models import SlidePlan

class LLMProvider:
    def __init__(self, provider: str, api_key: str):
        self.provider = provider
        self.api_key = api_key

    async def generate_slide_plan(self, text: str, tone: str = "") -> SlidePlan:
        prompt = f"""
        You are a slide planner. Input may be Markdown or prose.
        Goal: produce a JSON SlidePlan with a reasonable number of slides for a {tone} deck.
        Constraints: ≤5 bullets/slide, ≤12 words/bullet.
        Output keys: slides[{{
            layout_hint, title, bullets[], notes
        }}]
        Input:
        {text}
        """

        if self.provider == "openai":
            return await self._call_openai(prompt)
        elif self.provider == "anthropic":
            return await self._call_anthropic(prompt)
        elif self.provider == "gemini":
            return await self._call_gemini(prompt)
        else:
            raise ValueError("Unsupported provider")

    async def _call_openai(self, prompt: str) -> SlidePlan:
        headers = {"Authorization": f"Bearer {self.api_key}"}
        payload = {
            "model": "gpt-4o-mini",
            "messages": [{"role": "user", "content": prompt}],
            "response_format": {"type": "json_object"},
        }
        async with httpx.AsyncClient(timeout=60) as client:
            r = await client.post("https://api.openai.com/v1/chat/completions",
                                  json=payload, headers=headers)
        data = r.json()
        return SlidePlan.parse_raw(data["choices"][0]["message"]["content"])

    async def _call_anthropic(self, prompt: str) -> SlidePlan:
        # Simplified – same idea
        raise NotImplementedError("Anthropic adapter TODO")

    async def _call_gemini(self, prompt: str) -> SlidePlan:
        # Simplified – same idea
        raise NotImplementedError("Gemini adapter TODO")
