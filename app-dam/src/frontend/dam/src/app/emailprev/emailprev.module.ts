import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailprevPageRoutingModule } from './emailprev-routing.module';
import { FormatoTasaPipe } from '../pipe/formato-tasa.pipe';
import { EmailprevPage } from './emailprev.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailprevPageRoutingModule
  ],
  declarations: [EmailprevPage, FormatoTasaPipe]
})
export class EmailprevPageModule {}
