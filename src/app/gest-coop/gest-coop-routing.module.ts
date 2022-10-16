import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoopNewComponent } from './coop-new/coop-new.component';
import { CoopViewComponent } from './coop-view/coop-view.component';
import { GestCoopComponent } from './gest-coop.component';

const routes: Routes = [
  { path: '', /*TODO: Add Guard user !*/ component: CoopViewComponent },
  { path: "admin", /*TODO: Add Guard coop !*/ children: [
    {path: "", component: GestCoopComponent},
    //{ path: ':id', component: GestCoopComponent },
    {path: "new", component: CoopNewComponent},
  ]},
  //{ path: 'admin', component: GestCoopComponent },
  //{ path: 'admin/new', component: CoopNewComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestCoopRoutingModule { }
