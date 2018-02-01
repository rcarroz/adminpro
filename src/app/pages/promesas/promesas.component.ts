import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {


    this.contarTres().then(
      mensaje => console.log('Termino!', mensaje)
    )
    .catch ( error => console.error('Error en la promesa', error));

  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    // Creando promesa
    return new Promise( (resolve, reject) => {

      let contador = 0;

      // Funcion que se va a disparar cada segundo
      let intervalo = setInterval( () => {

        contador += 1;
        

        if ( contador === 3 ) {
          resolve( true );
          clearInterval( intervalo );
        }

      }, 1000);

    });
    
  }
}
