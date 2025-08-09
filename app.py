from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import FileResponse
from pydantic import BaseModel
from docxtpl import DocxTemplate
import uuid
import os

app = FastAPI()

class DataModel(BaseModel):
    nombre_protocolo: str
    codigo: str
    fecha_creacion: str
    version: str
    fecha_modificacion: str
    objetivo: str
    alcance: str
    marco_teorico: str
    definiciones: str
    responsabilidades: str
    materiales: str
    descripcion_actividad: str
    registros: str
    control_cambios: str
    elaboro: str
    cargo_elaboro: str
    reviso: str
    cargo_reviso: str
    aprobo: str
    cargo_aprobo: str


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
