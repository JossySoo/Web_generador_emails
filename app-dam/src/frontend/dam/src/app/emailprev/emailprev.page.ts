import { Component, OnInit } from '@angular/core';
import { GenerarEmailService } from '../services/generar-email.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emailprev',
  templateUrl: './emailprev.page.html',
  styleUrls: ['./emailprev.page.scss'],
})
export class EmailprevPage implements OnInit {
  uri = 'http://localhost:8000/emails/'
  html_preview='Sin email generado aún'
  datos_email = {email_ID: 0,
    usuario_ID: 0,
    segmento: '',
    fecha_creacion: new Date(),
    titulo1: '',
    titulo2: '',
    fraseinicial: '',
    parrafo: '',
    haveTasa: false,
    tasa: 0,
    legal_tasa: '',
    html: ''}

  constructor(private _generarEmailService: GenerarEmailService,
              private _http: HttpClient,
              private _actRouter: ActivatedRoute) { }

  ngOnInit() {
    // this.html_preview=this._generarEmailService.mostrarEmail ()
  
  }
  async ionViewWillEnter () {
    console.log(`Me llegó el id: ${Number(this._actRouter.snapshot.paramMap.get('id'))}`)

    if (this._actRouter.snapshot.paramMap.get('id')) {
       await this.getEmail (Number(this._actRouter.snapshot.paramMap.get('id')))
       .then((email_bd) => {
         this.datos_email =email_bd
         console.log(this.datos_email)
       })
       .catch((error) => {
         console.log(error)
       })
    }

  }


  getEmail (emailId: number): Promise<any> {
    return firstValueFrom(this._http.get(this.uri+emailId))
  }
  
}
