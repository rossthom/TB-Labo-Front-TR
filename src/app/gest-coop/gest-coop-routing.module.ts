import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestCoopComponent } from './gest-coop.component';

const routes: Routes = [
  { path: '', component: GestCoopComponent },
  //{ path: 'coop-create', component: CoopCuComponent },
  //{ path: 'coop-update/:id', component: CoopCuComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestCoopRoutingModule { }
