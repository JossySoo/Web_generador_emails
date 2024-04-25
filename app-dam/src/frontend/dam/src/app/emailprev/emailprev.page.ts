import { Component, OnInit } from '@angular/core';
import { GenerarEmailService } from '../services/generar-email.service';

@Component({
  selector: 'app-emailprev',
  templateUrl: './emailprev.page.html',
  styleUrls: ['./emailprev.page.scss'],
})
export class EmailprevPage implements OnInit {
  html_preview='Sin email generado aún'
  constructor(private _generarEmailService: GenerarEmailService) { }

  ngOnInit() {
    // this.html_preview=this._generarEmailService.mostrarEmail ()
    this.html_preview=this._generarEmailService.mostrarEmail()
    console.log(this.html_preview)
  }
  
}
