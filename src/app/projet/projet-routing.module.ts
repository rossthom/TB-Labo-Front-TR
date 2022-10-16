import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoopLoginComponent } from './compos/coop-login/coop-login.component';
import { HomeComponent } from './compos/home/home.component';
import { TestboardComponent } from './compos/testboard/testboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coop-login', component: CoopLoginComponent },
  { path: 'test', component: TestboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
