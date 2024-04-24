import { Component, OnDestroy, OnInit } from '@angular/core';
import { SegmentosService } from '../services/segmentos.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  constructor(private _segmentosService: SegmentosService) {}

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

  ngOnDestroy(): void {
    // this.subscription.unsubscribe()
    // this.subscriptionMouseMove.unsubscribe()
  }

}
