import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-formulario-email',
  templateUrl: './formulario-email.component.html',
  styleUrls: ['./formulario-email.component.scss'],
})
export class FormEmailComponent  {

  constructor(private formBuilder: FormBuilder) { }

  emailForm = new FormBuilder().group({
    titulo1: ['', [Validators.required, Validators.minLength(3)]],
    favoriteFruit: ['', [Validators.required]], // Ion-select para frutas
    haveTasa: ['', [Validators.required]] // Checkbox para términos y condiciones
  })

  onSubmit() {
    if (this.emailForm.valid) {
      console.log(this.emailForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

}
