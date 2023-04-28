import { NgModule} from "@angular/core";
import {Router, RouterModule, Routes} from "@angular/router";
import {FaceSnapListComponent} from "./face-snaps/components/face-snap-list/face-snap-list.component";
import {LandingPageComponent} from "./landing-page/components/landing-page/landing-page.component";
import {SingleFaceSnapComponent} from "./face-snaps/components/single-face-snap/single-face-snap.component";
import {NewFaceSnapComponent} from "./face-snaps/components/new-face-snap/new-face-snap.component";

/*
Cette syntaxe fait en sorte qu'Angular génère un fichier JS séparé pour FaceSnapsModule,
 et l'application ne la charge que si l'utilisateur visite une route  facesnaps/
 */
const routes: Routes = [
  {path: 'facesnaps', loadChildren: () => import('./face-snaps/face-snaps.module').then(m => m.FaceSnapsModule) },
  {path: '', component: LandingPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{

}
