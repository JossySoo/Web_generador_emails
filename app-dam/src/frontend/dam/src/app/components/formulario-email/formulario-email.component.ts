import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SegmentosService } from '../../services/segmentos.service';
import { GenerarEmailService } from '../../services/generar-email.service';


@Component({
  selector: 'app-formulario-email',
  templateUrl: './formulario-email.component.html',
  styleUrls: ['./formulario-email.component.scss'],
})
export class FormEmailComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private _segmentosService: SegmentosService,
              private _generarEmailService: GenerarEmailService,
  ) { }
  datos_email = {titulo1:'',titulo2:'',fraseinicial:'',parrafo:'' , haveTasa:false ,
                  segmentoCliente:'', tasa:0 , legal_tasa:'' }
  lista_segmentos=[]
  emailForm = new FormBuilder().group({
    titulo1: ['', [Validators.required, Validators.minLength(1)]],
    titulo2: ['', [Validators.required, Validators.minLength(1)]],
    segmentoCliente: ['', [Validators.required]], 
    fraseinicial: ['', [Validators.required, Validators.minLength(1)]],
    parrafo: ['', [Validators.required, Validators.minLength(1)]],
    haveTasa: [false, [Validators.required]],
    tasa: [''],
    legal_tasa: ['']
  })

  async ngOnInit() {
    await this._segmentosService.getSegmentos()
      .then((segmentos) => {
        this.lista_segmentos =segmentos.map( (item: {Segmento:string,Descripcion:string} ) => item.Segmento)
        console.log(this.lista_segmentos)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onSubmit() {
    if (this.emailForm.valid) {
      console.log(this.datos_email);

             if (this.datos_email.haveTasa) {
                this._generarEmailService.generarEmail(
                      this.datos_email.titulo1, 
                      this.datos_email.titulo2,
                      this.datos_email.fraseinicial,
                      this.datos_email.parrafo,
                      this.datos_email.haveTasa,
                      this.datos_email.segmentoCliente, 
                      (this.datos_email.tasa*100).toString+"%" , 
                      this.datos_email.legal_tasa)
            } else{
              this._generarEmailService.generarEmail(
                      this.datos_email.titulo1, 
                      this.datos_email.titulo2,
                      this.datos_email.fraseinicial,
                      this.datos_email.parrafo,
                      this.datos_email.haveTasa,
                      this.datos_email.segmentoCliente)}
    } else {
      console.log('Form is not valid');
    }
  }

}
