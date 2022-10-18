import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoopNewComponent } from './coop-new/coop-new.component';
import { GestCoopComponent } from './gest-coop.component';
import { CoopLoginGuard } from './shared/guards/coop-login.guard';

const routes: Routes = [
  {path: "view", canActivate: [CoopLoginGuard], children: [
    { path: ':id', component: GestCoopComponent },
  ]},
  { path: "new", component: CoopNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestCoopRoutingModule { }
