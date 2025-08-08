from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from docxtpl import DocxTemplate
import uuid
import os

app = FastAPI()

class DataModel(BaseModel):
    titulo: str
    items: list[str]

@app.post("/generate-docx/")
async def generate_docx(data: DataModel):
    template_path = "base.docx"
    doc = DocxTemplate(template_path)
    doc.render(data.dict())
    output_filename = f"output_{uuid.uuid4()}.docx"
    doc.save(output_filename)

    # Retorna el archivo generado y luego lo elimina después de enviarlo
    response = FileResponse(
        output_filename,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=output_filename,
        background=None  # Puedes usar BackgroundTask para eliminar el archivo después
    )
    return response
