import { Routes } from '@angular/router';
import { PruebasComponent } from './components/pruebas/pruebas.component';

export const routes: Routes = [

   { path: 'Pruebass',  component: PruebasComponent, },

   { path: '**', pathMatch:'full',redirectTo:'Pruebass' } 
];
