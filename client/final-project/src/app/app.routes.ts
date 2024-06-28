import { Routes } from '@angular/router';
import { CartillaMedicaComponent } from './components/cartilla-medica/cartilla-medica.component';
import { TurnoRegistroComponent } from './components/turno-registro/turno-registro.component';

export const routes: Routes = [
    {path:'cartilla-medica', component: CartillaMedicaComponent},
    {path:'turno-registro',component: TurnoRegistroComponent}
    
    
];
