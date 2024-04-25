import { Component, OnInit } from '@angular/core';
import { GenerarEmailService } from '../services/generar-email.service';

@Component({
  selector: 'app-emailprev',
  templateUrl: './emailprev.page.html',
  styleUrls: ['./emailprev.page.scss'],
})
export class EmailprevPage implements OnInit {
  html_preview='Sin email generado aún'
  datos_email = {titulo1:'',titulo2:'',fraseinicial:'',parrafo:'' , haveTasa:false ,
  segmentoCliente:'', tasa:'' , legal_tasa:'' }

  constructor(private _generarEmailService: GenerarEmailService) { }

  ngOnInit() {
    // this.html_preview=this._generarEmailService.mostrarEmail ()
    this.datos_email=this._generarEmailService.mostrarEmail()
    console.log(this._generarEmailService.mostrarEmail())
    console.log(this.datos_email)
  }
  
}
