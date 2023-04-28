import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {httpInterceptorProviders} from "./interceptors";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./components/header/header.component";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,// Si jamais votre module doit déclarer des components (comme CoreModule va déclarer HeaderComponent), il faut qu'il importe CommonModule.
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    httpInterceptorProviders
  ]
})
export class CoreModule { }
