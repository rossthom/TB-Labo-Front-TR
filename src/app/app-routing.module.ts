import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { NotfoundComponent } from './shared/compos/notfound/notfound.component';
import { HomeComponent } from './projet/home/home.component';
import { CoopLoginComponent } from './gest-coop/coop-login/coop-login.component';
import { UserLoginComponent } from './projet/user-login/user-login.component';
import { UserNewComponent } from './projet/user-new/user-new.component';
import { UserProfileComponent } from './projet/user-profile/user-profile.component';
import { TestboardComponent } from './projet/testboard/testboard.component';
import { UserLoggedGuard } from './shared/guards/user-logged.guard';
import { UserOrCoopLoggedOutGuard } from './shared/guards/user-or-coop-logged-out.guard';
import { CoopNewComponent } from './gest-coop/coop-new/coop-new.component';
import { GestCoopComponent } from './gest-coop/gest-coop.component';
import { CoopLoggedGuard } from './shared/guards/coop-logged.guard';
import { EventsListComponent } from './projet/events-list/events-list.component';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: "login", canActivateChild: [UserOrCoopLoggedOutGuard], children: [
                { path: 'coop', component: CoopLoginComponent },
                { path: 'user', component: UserLoginComponent },
            ]},

            { path: "create", canActivateChild: [UserOrCoopLoggedOutGuard], children: [
                { path: 'coop', component: CoopNewComponent },
                { path: 'user', component: UserNewComponent },
            ]},

            { path: "profile", children: [
                {path: "coop/:id", canActivate: [CoopLoggedGuard], component: GestCoopComponent},
                {path: "user/:id", canActivate: [UserLoggedGuard], component: UserProfileComponent },
            ]},

            { path: 'events', canActivate: [UserLoggedGuard], component: EventsListComponent },
                        
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
