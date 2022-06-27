import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { DietaComponent } from './components/dieta/dieta.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'activity', component: ActivityComponent},
  {path:'dieta', component: DietaComponent},
  {path:'User-info', component: UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
