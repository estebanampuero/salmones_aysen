// SERIALIZACIÓN DE CAMPOS CON VIÑETAS Y SUBVIÑETAS PARA FORMULARIO HTML
// Pega este archivo en tu proyecto y enlázalo en tu HTML con <script src="serializacion_formulario.js"></script>

// Este código debe ejecutarse dentro del handler del submit del formulario
// Ejemplo: document.getElementById('procedimientoForm').addEventListener('submit', function(e) { ... });

function serializarCamposFormulario() {
  // Serializar Marco Teórico
  const marcoTeoricoItems = document.querySelectorAll('.marco-teorico-input');
  const marcoTeoricoText = Array.from(marcoTeoricoItems)
    .map((input) => input.value.trim())
    .filter(text => text !== '')
    .join('\n');
  document.getElementById('marco_teorico_formatted').value = marcoTeoricoText;

  // Serializar Definiciones
  const defItems = document.querySelectorAll('.definicion-item');
  const definicionesText = Array.from(defItems)
    .map((item) => {
      const termino = item.querySelector('.def-termino').value.trim();
      const descripcion = item.querySelector('.def-descripcion').value.trim();
      return termino && descripcion ? `${termino}: ${descripcion}` : '';
    })
    .filter(text => text !== '')
    .join('\n');
  document.getElementById('definiciones_formatted').value = definicionesText;

  // Serializar RESPONSABILIDADES como texto plano con viñetas y subviñetas
  const responsabilidadItems = document.querySelectorAll('.responsabilidad-item');
  const responsabilidadesText = Array.from(responsabilidadItems).map(item => {
    const principal = item.querySelector('.responsabilidad-input').value.trim();
    const subItems = item.querySelectorAll('.subresponsabilidad-input');
    let txt = principal ? `• ${principal}\n` : '';
    if (subItems.length > 0) {
      txt += Array.from(subItems)
        .map(sub => {
          const subText = sub.value.trim();
          return subText ? `    - ${subText}\n` : '';
        })
        .join('');
    }
    return txt;
  }).join('');
  document.getElementById('responsabilidades_formatted').value = responsabilidadesText.trim();

  // Serializar Materiales
  const matItems = document.querySelectorAll('.material-input');
  const materialesText = Array.from(matItems)
    .map((input) => input.value.trim())
    .filter(text => text !== '')
    .join('\n');
  document.getElementById('materiales_formatted').value = materialesText;

  // Serializar DESCRIPCIÓN DE ACTIVIDAD como texto plano con viñetas y subviñetas
  const actividadSections = document.querySelectorAll('.actividad-section');
  let actividadText = '';
  actividadSections.forEach((section) => {
    const sectionTitle = section.querySelector('.section-title').value.trim();
    if (sectionTitle) {
      actividadText += `• ${sectionTitle}\n`;
      // Contenido principal de la sección
      const contentItems = section.querySelector('.section-content').querySelectorAll('.content-input');
      contentItems.forEach(content => {
        const contentText = content.value.trim();
        if (contentText) {
          actividadText += `   ✔ ${contentText}\n`;
        }
      });
      // Subsecciones
      const subsections = section.querySelectorAll('.subsection');
      subsections.forEach((subsection) => {
        const subsectionTitle = subsection.querySelector('.subsection-title').value.trim();
        if (subsectionTitle) {
          actividadText += `   - ${subsectionTitle}\n`;
          const subContentItems = subsection.querySelectorAll('.content-input');
          subContentItems.forEach(subContent => {
            const subContentText = subContent.value.trim();
            if (subContentText) {
              actividadText += `      ✔ ${subContentText}\n`;
            }
          });
        }
      });
      actividadText += '\n';
    }
  });
  document.getElementById('descripcion_actividad_formatted').value = actividadText.trim();

  // Serializar Registros
  const regItems = document.querySelectorAll('.registro-input');
  const registrosText = Array.from(regItems)
    .map((input) => input.value.trim())
    .filter(text => text !== '')
    .join('\n');
  document.getElementById('registros_formatted').value = registrosText;

  // Serializar Control de Cambios
  const cambioRows = document.querySelectorAll('.cambio-row');
  let cambiosText = 'Versión N°\tFecha modificación\tDescripción del Cambio\n';
  cambiosText += '─────────────────────────────────────────────────────\n';
  cambioRows.forEach(row => {
    const version = row.querySelector('.cambio-version').value.trim();
    const fecha = row.querySelector('.cambio-fecha').value;
    const descripcion = row.querySelector('.cambio-descripcion').value.trim();
    if (version && fecha && descripcion) {
      const fechaFormatted = fecha ? new Date(fecha).toLocaleDateString('es-CL') : '';
      cambiosText += `${version}\t${fechaFormatted}\t${descripcion}\n`;
    }
  });
  document.getElementById('control_cambios_formatted').value = cambiosText.trim();
}

// Ejemplo de uso: Llama a serializarCamposFormulario() justo antes de enviar el formulario
// document.getElementById('procedimientoForm').addEventListener('submit', function(e) {
//   e.preventDefault();
//   serializarCamposFormulario();
//   // ...continúa con el envío del formulario...
// });
