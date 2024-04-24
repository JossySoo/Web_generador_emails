// src/app/components/components.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormEmailComponent } from './formulario-email.component';

@NgModule({
  declarations: [FormEmailComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FormEmailComponent]
})
export class FormEmailModule {}