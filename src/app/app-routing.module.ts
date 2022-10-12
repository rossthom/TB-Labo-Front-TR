import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { NotfoundComponent } from './shared/compos/notfound/notfound.component';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./projet/projet.module').then(m => m.ProjetModule) },
            

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
