import { Routes } from '@angular/router';
import { CartillaMedicaComponent } from './components/cartilla-medica/cartilla-medica.component';
import { TurnoRegistroComponent } from './components/turno-registro/turno-registro.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


export const routes: Routes = [
    {path:'cartilla-medica', component: CartillaMedicaComponent},
    {path:'turno-registro',component: TurnoRegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule] 
})
export class AppRoutingModule { }
