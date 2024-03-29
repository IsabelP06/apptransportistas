import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObservacionesPage } from './observaciones.page';

const routes: Routes = [
  {
    path: ':id',
    component: ObservacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservacionesPageRoutingModule {}
