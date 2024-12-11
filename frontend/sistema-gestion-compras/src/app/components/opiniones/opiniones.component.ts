import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css'] // Asegúrate de que este archivo combine los estilos necesarios
})
export class OpinionesComponent implements OnInit {
  
  // Datos de ejemplo para comentarios
  comentariosData = [
    { producto: 'Laptop', comentario: 'Muy bueno, llegó rápido.', estado: 'Aprobado', accion: 'Responder' },
    { producto: 'Audífonos', comentario: 'El producto llegó dañado.', estado: 'Pendiente', accion: 'Aprobar/Rechazar' },
  ];

  // Datos de ejemplo para calificaciones
  calificacionesData = [
    { producto: 'Laptop', promedio: '★★★★★ (4.5)', comentario: 'Excelente calidad, lo recomiendo.' },
    { producto: 'Audífonos', promedio: '★★★☆☆ (3.2)', comentario: 'Es bueno, pero esperaba más.' },
  ];

  // Estado para mostrar la sección activa
  activeSection: 'comentarios' | 'calificaciones' = 'comentarios';

  constructor() {}

  ngOnInit(): void {
    // Por defecto, cargar la sección de comentarios
    this.toggleSection('comentarios');
  }

  // Alternar entre las secciones de comentarios y calificaciones
  toggleSection(section: 'comentarios' | 'calificaciones'): void {
    this.activeSection = section;
  }
}
