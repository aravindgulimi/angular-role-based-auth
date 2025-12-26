import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path : '', redirectTo: 'login', pathMatch: 'full'},
   {path : 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard],
    data: { role: 'Admin' }},
  {path: 'customer', component: CustomerPageComponent, canActivate: [RoleGuard],
    data: { role: 'Customer' }},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
