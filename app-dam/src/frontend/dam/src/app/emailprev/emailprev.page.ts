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
  datos_email = {titulo1:'',titulo2:'',fraseinicial:'',parrafo:'' , haveTasa:false ,
  segmentoCliente:'', tasa:'' , legal_tasa:'' }

  constructor(private _generarEmailService: GenerarEmailService,
              private _http: HttpClient,
              private _actRouter: ActivatedRoute) { }

  ngOnInit() {
    // this.html_preview=this._generarEmailService.mostrarEmail ()
  
  }
  ionViewWillEnter () {
    console.log(`Me llegó el id: ${Number(this._actRouter.snapshot.paramMap.get('id'))}`)

    if (this._actRouter.snapshot.paramMap.get('id')) {
       this.getEmail (Number(this._actRouter.snapshot.paramMap.get('id')))
    }

  }


  getEmail (emailId: number): Promise<any> {
    return firstValueFrom(this._http.get(this.uri+emailId))
  }
  
}
