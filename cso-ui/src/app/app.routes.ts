import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Register } from './component/register/register';
import { Dashboard } from './component/dashboard/dashboard';
import { CreatePolicy } from './component/create-policy/create-policy';
import { ViewPolicy } from './component/view-policy/view-policy';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard',component: Dashboard },
  {path:'create-policy',component:CreatePolicy},
  { path: 'view-policy',component:ViewPolicy },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
