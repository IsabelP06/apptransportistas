import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPage } from './registro.page';

const routes: Routes = [
  {
    path: 'archivos',
    loadChildren: () => import('./../archivos/archivos.module').then((e) => e.ArchivosPageModule)
  },
  {
    path: "observaciones", loadChildren: () => import('./../observaciones/observaciones.module').then((e) => e.ObservacionesPageModule)
  },
  {
    path: ':id',
    component: RegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule { }
