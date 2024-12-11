import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css'] // Fixed typo: styleUrls instead of styleUrl
})
export class SucursalesComponent implements OnInit {
  // Estado para controlar las secciones visibles
  showSucursales: boolean = true;
  showClientes: boolean = false;

  // Datos para las tablas
  sucursales: any[] = [];
  clientes: any[] = [];

  // Constructor con HttpClient para llamadas al backend
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Cargar datos iniciales
    this.cargarSucursales();
    this.cargarClientes();
  }

  // Cambiar entre las secciones
  mostrarSucursales() {
    this.showSucursales = true;
    this.showClientes = false;
  }

  mostrarClientes() {
    this.showSucursales = false;
    this.showClientes = true;
  }

  // Cargar sucursales desde el backend
  cargarSucursales() {
    this.http.get<any[]>('https://api.example.com/sucursales') // Reemplaza con tu API
      .subscribe(
        (data) => {
          this.sucursales = data;
        },
        (error) => {
          console.error('Error al cargar sucursales:', error);
        }
      );
  }

  // Cargar clientes desde el backend
  cargarClientes() {
    this.http.get<any[]>('https://api.example.com/clientes') // Reemplaza con tu API
      .subscribe(
        (data) => {
          this.clientes = data;
        },
        (error) => {
          console.error('Error al cargar clientes:', error);
        }
      );
  }
}
