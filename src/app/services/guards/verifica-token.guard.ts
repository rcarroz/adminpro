import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}


  canActivate():  Promise<boolean> | boolean {


    let token =  this._usuarioService.token;
    // atob() descodifica una cadena de datos q ha sido codificada utilizando la codificacion en base-64
    let payload = JSON.parse( atob( token.split('.')[1] ));

    let expirado = this.token_expirado( payload.exp );

    if ( expirado ) {
      this.router.navigate(['/login']); // saca al usuario al login
      return false;
    }

    return this.verificarRenovar( payload.exp );
  }

  verificarRenovar( fechaExp: number ): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000) );

      if ( tokenExp.getTime() > ahora.getTime() ){
        resolve( true );
      } else {
        this._usuarioService.renuevaToken()
                            .subscribe( () => {
                              resolve( true );
                            }, () => {
                              this.router.navigate(['/login']); // saca al usuario al login
                              reject( false );
                            });
      }
    });
  }

  token_expirado( fechaExp: number ) {

  let ahora = new Date().getTime() / 1000;

  if ( fechaExp < ahora ) {
    return true;
  }else{
    return false;
  }

  }
}
