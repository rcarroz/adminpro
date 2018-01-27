import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

// Solo importa la instrccion MAP y no la libreria completa
import 'rxjs/add/operator/map';
//  import * as swal from 'sweetalert';
import swal from 'sweetalert';

import { Router } from '@angular/router';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( 
    public http: HttpClient,
    public router: Router ) {

    this.cargarStorage();
  }
  
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario){
    
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );

    this.usuario = usuario;
    this.token = token;

  }

  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  // Login de Google
  loginGoogle( token: string ){

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } )
                    .map( (resp: any) => {
                      this.guardarStorage( resp.id, resp.token, resp.usuario );
                      return true;
                    });

  }

   // Login del Usuario
   login( usuario: Usuario, recordar: boolean = false ) {

    // Para recordar el email y lo muestre en el login
    if ( recordar ){
      localStorage.setItem( 'email', usuario.email );
    }else{
      localStorage.removeItem('email');
    }

    let url= URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                    .map( (resp: any ) => {

                      this.guardarStorage( resp.id, resp.token, resp.usuario );

                      return true;
                    });



   }


   crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
              .map( (resp: any ) => {

                swal('Usuario creado', usuario.email, 'success');
                return resp.usuario;
              });

   }
}
