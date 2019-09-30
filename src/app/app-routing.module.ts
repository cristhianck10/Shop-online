import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'general', loadChildren: './general/general.module#GeneralPageModule' },
  { path: 'list-categoria', loadChildren: './list-categoria/list-categoria.module#ListCategoriaPageModule' },
  { path: 'categoria-id/:id', loadChildren: './categoria-id/categoria-id.module#CategoriaIdPageModule' },
  { path: 'producto/:id', loadChildren: './producto/producto.module#ProductoPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'domicilio/:total', loadChildren: './domicilio/domicilio.module#DomicilioPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
