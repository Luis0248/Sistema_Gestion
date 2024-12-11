// Selección de elementos DOM
const comentariosSection = document.getElementById("comentarios-section");
const calificacionesSection = document.getElementById("calificaciones-section");
const btnComentarios = document.getElementById("btn-comentarios");
const btnCalificaciones = document.getElementById("btn-calificaciones");

// Datos de ejemplo para comentarios
const comentariosData = [
    { producto: "Laptop", comentario: "Muy bueno, llegó rápido.", estado: "Aprobado", accion: "Responder" },
    { producto: "Audífonos", comentario: "El producto llegó dañado.", estado: "Pendiente", accion: "Aprobar/Rechazar" },
];

// Datos de ejemplo para calificaciones
const calificacionesData = [
    { producto: "Laptop", promedio: "★★★★★ (4.5)", comentario: "Excelente calidad, lo recomiendo." },
    { producto: "Audífonos", promedio: "★★★☆☆ (3.2)", comentario: "Es bueno, pero esperaba más." },
];

// Función para alternar entre secciones
function toggleSection(sectionToShow) {
    if (sectionToShow === "comentarios") {
        comentariosSection.classList.remove("d-none");
        calificacionesSection.classList.add("d-none");
        btnComentarios.classList.add("btn-primary");
        btnComentarios.classList.remove("btn-secondary");
        btnCalificaciones.classList.add("btn-secondary");
        btnCalificaciones.classList.remove("btn-primary");
    } else if (sectionToShow === "calificaciones") {
        calificacionesSection.classList.remove("d-none");
        comentariosSection.classList.add("d-none");
        btnCalificaciones.classList.add("btn-primary");
        btnCalificaciones.classList.remove("btn-secondary");
        btnComentarios.classList.add("btn-secondary");
        btnComentarios.classList.remove("btn-primary");
    }
}

// Función para cargar datos en la tabla de comentarios
function loadComentarios() {
    const comentariosBody = document.getElementById("comentarios-body");
    comentariosBody.innerHTML = ""; // Limpiar contenido anterior
    comentariosData.forEach((comentario) => {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${comentario.producto}</td>
    <td>${comentario.comentario}</td>
    <td>${comentario.estado}</td>
    <td><button class="btn btn-sm btn-outline-primary">${comentario.accion}</button></td>
    `;
        comentariosBody.appendChild(row);
    });
}

// Función para cargar datos en la tabla de calificaciones
function loadCalificaciones() {
    const calificacionesBody = document.getElementById("calificaciones-body");
    calificacionesBody.innerHTML = ""; // Limpiar contenido anterior
    calificacionesData.forEach((calificacion) => {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${calificacion.producto}</td>
    <td>${calificacion.promedio}</td>
    <td>${calificacion.comentario}</td>
    `;
        calificacionesBody.appendChild(row);
    });
}

// Eventos para alternar secciones
btnComentarios.addEventListener("click", () => {
    toggleSection("comentarios");
});

btnCalificaciones.addEventListener("click", () => {
    toggleSection("calificaciones");
});

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    toggleSection("comentarios"); // Mostrar la sección de comentarios por defecto
    loadComentarios(); // Cargar datos en la tabla de comentarios
    loadCalificaciones(); // Cargar datos en la tabla de calificaciones
});