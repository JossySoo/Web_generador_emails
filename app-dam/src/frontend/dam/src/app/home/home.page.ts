import { Component, OnDestroy, OnInit } from '@angular/core';
import { SegmentosService } from '../services/segmentos.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  constructor(private _segmentosService: SegmentosService,
              private _loginService: LoginService  ) {}

  async ngOnInit() {
    await this._segmentosService.getSegmentos()
      .then((dispositivos) => {
        console.log(dispositivos)
      })
      .catch((error) => {
        console.log(error)
      })
    console.log('Me ejecuto primero')
  }

  onLogout() {
      this._loginService.logout()
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe()
    // this.subscriptionMouseMove.unsubscribe()
  }

}
