import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  constructor(private _loginService: LoginService  ) {}

  async ngOnInit() {
    console.log('Prueba')
  }

  onLogout() {
      this._loginService.logout()
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe()
    // this.subscriptionMouseMove.unsubscribe()
  }

}