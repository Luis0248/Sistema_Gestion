import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes para los que creas las rutas
import { ComprasComponent } from './components/compras/compras.component';
import { DevolucionesComponent } from './components/devoluciones/devoluciones.component';
import { OpinionesComponent } from './components/opiniones/opiniones.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ServicioClienteComponent } from './components/servicio-cliente/servicio-cliente.component';
import {SucursalesComponent} from './components/sucursales/sucursales.component';

// Definir las rutas
const routes: Routes = [
  { path: 'compras', component: ComprasComponent },
  { path: 'devoluciones', component: DevolucionesComponent },
  { path: 'opiniones', component: OpinionesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'servicio-clientes', component: ServicioClienteComponent },
  { path: 'Sucursales' , component: SucursalesComponent },
  { path: '', redirectTo: '/compras', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura las rutas en la aplicación
  exports: [RouterModule] // Exporta RouterModule para que se pueda usar en otras partes de la aplicación
})
export class AppRoutingModule { }
