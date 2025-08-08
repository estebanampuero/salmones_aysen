from docxtpl import DocxTemplate

data = {
    "titulo": "Informe de prueba",
    "items": ["Punto 1", "Punto 2", "Punto 3"]
}

doc = DocxTemplate("base.docx")
doc.render(data)
doc.save("reporte_generado.docx")

print("Documento creado: reporte_generado.docx")
