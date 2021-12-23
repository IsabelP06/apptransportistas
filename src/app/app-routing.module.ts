import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path:"",loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
  },
  {
    path:"transportista",loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
