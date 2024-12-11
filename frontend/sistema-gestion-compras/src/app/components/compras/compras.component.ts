import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class GestionComprasComponent implements OnInit {
  compras: any[] = [];
  filters = {
    idCompra: '',
    nombreProducto: '',
    fechaCompra: '',
    numeroFactura: '',
    estadoCompra: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras(): void {
    // Cambia la URL por la de tu backend
    this.http.get('http://localhost:3000/api/compras').subscribe(
      (data: any) => {
        this.compras = data;
      },
      (error) => {
        console.error('Error al cargar las compras', error);
      }
    );
  }
}
