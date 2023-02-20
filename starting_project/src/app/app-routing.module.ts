import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { SkillsComponent } from './skills/skills.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent , canActivate: [AuthGuard]},
  {path: 'user/:id/skills', component: SkillsComponent, canActivate: [AuthGuard] },
  
  { path: '',redirectTo: 'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
