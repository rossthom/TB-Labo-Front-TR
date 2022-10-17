import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoopLoginGuard } from '../gest-coop/shared/guards/coop-login.guard';
import { CoopLoginComponent } from './coop-login/coop-login.component';
import { CoopViewComponent } from './coop-view/coop-view.component';
import { HomeComponent } from './home/home.component';
import { TestboardComponent } from './testboard/testboard.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserNewComponent } from './user-new/user-new.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coop-login', component: CoopLoginComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'coop', component: CoopViewComponent },
  { path: "user", /*canDeactivate: [CoopLoginGuard],*/ children: [
    {path: "new", component: UserNewComponent},
    //{path: ":id", /*TODO: Add Guard user !*/ component: UserProfileComponent},
  ]},
  { path: 'test', component: TestboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
