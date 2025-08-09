from fastapi import FastAPI, BackgroundTasks
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
async def generate_docx(data: DataModel, background_tasks: BackgroundTasks):
    template_path = "base.docx"
    doc = DocxTemplate(template_path)
    doc.render(data.dict())
    output_filename = f"output_{uuid.uuid4()}.docx"
    doc.save(output_filename)

    def remove_file(path):
        try:
            os.remove(path)
        except Exception:
            pass

    background_tasks.add_task(remove_file, output_filename)
    return FileResponse(
        output_filename,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=output_filename
    )
