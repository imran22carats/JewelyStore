import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatePriceComponent } from './calculate-price/calculate-price.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    component: LoginComponent, path: '', pathMatch: 'full'
  },
  {
    component: LoginComponent, path: 'login'
  },
  {
    component: CalculatePriceComponent, path: 'calculate'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
