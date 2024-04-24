import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailprevPage } from './emailprev.page';

const routes: Routes = [
  {
    path: '',
    component: EmailprevPage
  },
  {
    path: ':id', // /emailprev/1
    component: EmailprevPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailprevPageRoutingModule {}
