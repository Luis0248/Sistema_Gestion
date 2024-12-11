import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GestionService {
  private apiUrl = '/api'; // Base URL del backend

  constructor(private http: HttpClient) {}

  obtenerCompras(clienteId: number, productoId?: number, fechaInicio?: string, fechaFin?: string): Observable<any> {
    const params: any = { cliente_id: clienteId };
    if (productoId) params.producto_id = productoId;
    if (fechaInicio && fechaFin) {
      params.fecha_inicio = fechaInicio;
      params.fecha_fin = fechaFin;
    }
    return this.http.get(`${this.apiUrl}/compras`, { params });
  }

  registrarCompra(compra: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/compras`, compra);
  }
}
