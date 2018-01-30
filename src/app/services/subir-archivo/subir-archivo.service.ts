import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  // Sube cualquier de Archivo en Vanilla JavaScrip
  subirArchivo( archivo: File, tipo: string, id: string ) {

    // retorna una promesa
    return new Promise(( resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = function() {

          if ( xhr.readyState === 4 ) {

            if ( xhr.status === 200 ) {

              console.log( 'imagen subida' );
              resolve( JSON.parse( xhr.response ) );

            } else {
              console.log( 'Fallo la subida' );
              reject( xhr.response );
            }

          }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true );
      xhr.send( formData );


    });

  }
}
