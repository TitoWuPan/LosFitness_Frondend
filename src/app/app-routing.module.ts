import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { HomeComponent } from './components/home/home.component';
import { RecompensaComponent } from './components/recompensa/recompensa.component';
import { UsuarioRecompensaComponent } from './components/usuario-recompensa/usuario-recompensa.component';
import { UsuarioComponent } from './components/usuario/usuario.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'activity', component: ActivityComponent},
  {path:'recompensa', component: RecompensaComponent},
  {path:'usuario', component: UsuarioComponent},
  {path:'usuariorecompensa', component: UsuarioRecompensaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
