
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SettingsService } from '../../services/service.index';





@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

    // _ajustes es el servicio y ajustes es la propiedad
  constructor( public _ajustes: SettingsService ) { }

  // esta accion se dispara al cargar el sistema
  ngOnInit() {
      this.colocarCheck();
  }


  cambiarColor( tema: string, link: any ) {

    this.aplicarCheck( link );

    this._ajustes.aplicarTema( tema );


  }

  aplicarCheck( link: any ) {
  
    let selectores: any  = document.getElementsByClassName('selector');

    for ( let ref of selectores ) {
        ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any  = document.getElementsByClassName('selector');

    let  tema = this._ajustes.ajustes.tema;

    for ( let ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema ){

        ref.classList.add('working');
        break;
      }  
    }

  }
}
