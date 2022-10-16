import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoopLoginComponent } from './coop-login/coop-login.component';
import { HomeComponent } from './home/home.component';
import { TestboardComponent } from './testboard/testboard.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserNewComponent } from './user-new/user-new.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coop-login', component: CoopLoginComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: "user", /*TODO: Add Guard coop !*/ children: [
    {path: "new", component: UserNewComponent},
    //{path: "profile", component: UserProfileComponent},
  ]},  { path: 'test', component: TestboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
