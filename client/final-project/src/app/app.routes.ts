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
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MedicoFormComponent } from './components/medico-form/medico-form.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';


export const routes: Routes = [
    {path:'cartilla-medica', component: CartillaMedicaComponent},
    {path:'turno-registro',component: TurnoRegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path:'header', component: HeaderComponent},
    {path:'footer', component: FooterComponent},
    {path:'novedades', component:NovedadComponent},
    {path:'novedad-form', component:NovedadFormComponent},
    {path:'home', component:HomeComponent},
    {path: "contact-form", component: ContactFormComponent},
    {path: "medico-form", component: MedicoFormComponent},
    {path: "perfil-usuario", component: PerfilUsuarioComponent}
];

/*@NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule] 
})*/
export class AppRoutingModule { }
