import { Component, OnInit } from '@angular/core';

import { PingpongService } from './pingpong.service';

@Component({
  selector: 'lm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';

  constructor(private pingpongService: PingpongService){}
}
