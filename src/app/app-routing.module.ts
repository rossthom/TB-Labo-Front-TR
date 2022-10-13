import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { NotfoundComponent } from './shared/compos/notfound/notfound.component';
import { TestboardComponent } from './projet/compos/testboard/testboard.component';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./projet/projet.module').then(m => m.ProjetModule) },
            { path: 'test', component: TestboardComponent },
            
            { path: 'gest-coop', /*TODO: Add Guard !*/ loadChildren: () => import('./gest-coop/gest-coop.module').then(m => m.GestCoopModule) },
            

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
