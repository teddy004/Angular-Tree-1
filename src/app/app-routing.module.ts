import { EmployeesPositionHierarchyComponent } from './employees-position-hierarchy/employees-position-hierarchy.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'employees-list', component: EmployeesListComponent},
  { path: 'edit-position/:id', component: RegistrationFormComponent }, // Adjust the actual path
  {path: 'employees-position-hierarchy', component: EmployeesPositionHierarchyComponent},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
