import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsuarioControlerComponent } from './components/usuario-controler/usuario-controler.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'usuarioControler',component:UsuarioControlerComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
