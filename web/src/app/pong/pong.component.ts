import { Component, OnInit } from "@angular/core";
import { PingpongService } from "../pingpong.service";
import { Action } from "../action.model";
import { take } from "rxjs/operators";

@Component({
  selector: "lm-pong",
  templateUrl: "./pong.component.html",
  styleUrls: ["./pong.component.scss"]
})
export class PongComponent implements OnInit {
  lastAction: Action = null;

  constructor(private pingpongService: PingpongService) {}

  ngOnInit() {
    this.initLastAction();
  }

  allowPong() {
    var allow = false;
    if (!!this.lastAction) {
      allow = this.lastAction.type == "PING";
    }
    return allow;
  }

  refesh() {
    this.initLastAction();
  }

  pong() {
    this.pingpongService
      .pong()
      .pipe(take(1))
      .subscribe(action => {
        console.log(action);
        this.lastAction = action;
      }),
      e => {
        console.log("Error");
      };
  }

  private initLastAction() {
    this.pingpongService
      .getLastAction()
      .pipe(take(1))
      .subscribe(action => {
        console.log(action);
        this.lastAction = action;
      }),
      e => {
        console.log("Error");
      };
  }
}
