import { Routes } from '@angular/router';
import { CartillaMedicaComponent } from './components/cartilla-medica/cartilla-medica.component';
import { TurnoRegistroComponent } from './components/turno-registro/turno-registro.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NovedadComponent } from './components/novedad/novedad.component';
import { NovedadFormComponent } from './components/novedad-form/novedad-form.component';
import { HomeComponent } from './components/home/home.component';

import { TurnosAltasComponent } from './components/turnos-altas/turnos-altas.component';
import { TurnosModBajaComponent } from './components/turnos-mod-baja/turnos-mod-baja.component';


export const routes: Routes = [
    {path:'cartilla-medica', component: CartillaMedicaComponent},
    {path:'turno-registro',component: TurnoRegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path:'header', component: HeaderComponent},
    {path:'footer', component: FooterComponent},
    {path:'novedades', component:NovedadComponent},
    {path:'novedad-form', component:NovedadFormComponent},
    
    {path: 'Altaturnos',  component: TurnosAltasComponent, },
    {path: 'modibajaturnos',  component: TurnosModBajaComponent, },
    {path:'home', component:HomeComponent},

   // { path: '**', pathMatch:'full',redirectTo:'home' }  //CUANDO SEA INCORRECTA LA DIRECCION SE ELIJE HOME POR DEFECTO
];


/*@NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule] 
})*/
// export class AppRoutingModule { }
