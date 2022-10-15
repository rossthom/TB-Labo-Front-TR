import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoopLoginComponent } from './coop-login/coop-login.component';
import { CoopNewComponent } from './coop-new/coop-new.component';
import { GestCoopComponent } from './gest-coop.component';

const routes: Routes = [
  { path: '', component: GestCoopComponent },
  //{ path: ':id', component: GestCoopComponent },
  { path: 'new', component: CoopNewComponent },
  { path: 'login', component: CoopLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestCoopRoutingModule { }
