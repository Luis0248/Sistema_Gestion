import { Component } from '@angular/core';

interface Devolucion {
  producto: string;
  motivo: string;
  estado: string;
  fecha: string;
}

interface Inventario {
  nombre: string;
  estado: string;
}

interface Reporte {
  producto: string;
  motivo: string;
  estado: string;
  fecha: string;
  cantidad: number;
}

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent {

  devoluciones: Devolucion[] = [
    { producto: 'Teclado mecánico', motivo: 'Producto defectuoso', estado: 'Pendiente', fecha: '01/12/2024' },
    { producto: 'Audífonos', motivo: 'No me gusta', estado: 'Aprobada', fecha: '02/12/2024' }
  ];

  inventario: Inventario[] = [
    { nombre: 'Teclado mecánico', estado: 'En stock' },
    { nombre: 'Audífonos', estado: 'No disponible' }
  ];

  reportes: Reporte[] = [
    { producto: 'Teclado mecánico', motivo: 'Producto defectuoso', estado: 'Aprobada', fecha: '01/12/2024', cantidad: 1 },
    { producto: 'Audífonos', motivo: 'No me gusta', estado: 'Rechazada', fecha: '02/12/2024', cantidad: 2 }
  ];

  currentView: 'devoluciones' | 'inventario' | 'reportes' = 'devoluciones';

  switchView(view: 'devoluciones' | 'inventario' | 'reportes'): void {
    this.currentView = view;
  }

  getDevoluciones(): Devolucion[] {
    return this.devoluciones;
  }

  getInventario(): Inventario[] {
    return this.inventario;
  }

  getReportes(): Reporte[] {
    return this.reportes;
  }
}