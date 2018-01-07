import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso: number = 20;

  constructor() { }

  ngOnInit() {
  }

  /*
    esta es una opcion para actualizar

    actualizarProgress( event: number ){
    this.progreso = event;
  }
  */

}
