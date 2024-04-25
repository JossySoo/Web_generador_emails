import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SegmentosService } from '../../services/segmentos.service';

@Component({
  selector: 'app-formulario-email',
  templateUrl: './formulario-email.component.html',
  styleUrls: ['./formulario-email.component.scss'],
})
export class FormEmailComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private _segmentosService: SegmentosService
  ) { }

  lista_segmentos=[]
  emailForm = new FormBuilder().group({
    titulo1: ['', [Validators.required, Validators.minLength(5)]],
    titulo2: ['', [Validators.required, Validators.minLength(5)]],
    segmentoCliente: ['', [Validators.required]], 
    fraseinicial: ['', [Validators.required, Validators.minLength(5)]],
    parrafo: ['', [Validators.required, Validators.minLength(5)]],
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
      console.log(this.emailForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

}
