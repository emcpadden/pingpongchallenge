import { Component, OnInit } from '@angular/core';
import { PingpongService } from '../pingpong.service';
import { Action } from '../action.model';
import { take } from 'rxjs/operators';

interface ActionListData {
  actions: Action[];
}

@Component({
  selector: 'lm-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {

  data: ActionListData = {
    actions: []
  };

  constructor(private pingpongService: PingpongService) { }

  ngOnInit() {
    this.pingpongService.getActions()
    .pipe(take(1))
    .subscribe((actions) => {
      this.data.actions = actions;
      console.log(actions);
    }),
    e => {
      console.log("Error");
    };
  }

}
