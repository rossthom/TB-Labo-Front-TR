import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { NotfoundComponent } from './shared/compos/notfound/notfound.component';
import { HomeComponent } from './projet/home/home.component';
import { CoopLoginComponent } from './gest-coop/coop-login/coop-login.component';
import { UserLoginComponent } from './projet/user-login/user-login.component';
import { CoopViewComponent } from './projet/coop-view/coop-view.component';
import { UserNewComponent } from './projet/user-new/user-new.component';
import { UserProfileComponent } from './projet/user-profile/user-profile.component';
import { TestboardComponent } from './projet/testboard/testboard.component';
import { UserLoginGuard } from './shared/guards/user-login.guard';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'events', canActivate: [UserLoginGuard], component: CoopViewComponent },
            { path: "login", /*canDeactivate: [CoopLoginGuard], canDeactivate: [UserLoginGuard],*/ children: [
                { path: 'coop', component: CoopLoginComponent },
                { path: 'user', component: UserLoginComponent },
            ]},
            { path: "user", /*canDeactivate: [CoopLoginGuard],*/ children: [
                {path: "new", component: UserNewComponent},
                {path: "profile", canActivate: [UserLoginGuard], children: [
                    { path: ':id', component: UserProfileComponent },
                ]},
            ]},
            
            { path: 'coop-admin', loadChildren: () => import('./gest-coop/gest-coop.module').then(m => m.GestCoopModule) },
            
            { path: 'test', component: TestboardComponent },

            // Routing 404
            { path: '**', component: NotfoundComponent },
        ],
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes, 
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
