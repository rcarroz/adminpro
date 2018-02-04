import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();

  }

  cargarMedicos() {
    this._medicoService.cargarMedicos()
                      .subscribe( medicos => this.medicos = medicos );
  }

  buscarMedico( termino: string ) {

    console.log(termino);
    
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
    }

    this._medicoService.buscarMedicos( termino )
                      .subscribe( medicos => this.medicos = medicos );
  }

  borrarMedico( medico: Medico) {

    this._medicoService.borrarMedico( medico._id )
                      .subscribe( () => this.cargarMedicos() );   // El subscribe hace que se ejecute el llamdo a la metodo
  }


  actualizarImagen( medico: Medico ) {

    this._modalUploadService.mostralModal( 'medicos', medico._id );

  }


}
