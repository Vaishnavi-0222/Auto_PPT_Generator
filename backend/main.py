from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import FileResponse
from .llm_providers import LLMProvider
from .ppt_generator import generate_pptx

app = FastAPI()

@app.post("/generate")
async def generate_ppt(
    input_text: str = Form(...),
    tone: str = Form(""),
    provider: str = Form(...),
    api_key: str = Form(...),
    template: UploadFile = None
):
    llm = LLMProvider(provider, api_key)
    slide_plan = await llm.generate_slide_plan(input_text, tone)
    file_path = generate_pptx(template.file, slide_plan)
    return FileResponse(file_path, filename="generated.pptx")
