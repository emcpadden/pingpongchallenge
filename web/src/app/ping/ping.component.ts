import { Component, OnInit } from "@angular/core";
import { PingpongService } from "../pingpong.service";
import { Action } from "../action.model";
import { take } from "rxjs/operators";

@Component({
  selector: "lm-ping",
  templateUrl: "./ping.component.html",
  styleUrls: ["./ping.component.scss"]
})
export class PingComponent implements OnInit {
  lastAction: Action = null;

  constructor(private pingpongService: PingpongService) {}

  ngOnInit() {
    this.initLastAction();
  }

  refesh() {
    this.initLastAction();
  }

  allowPing() {
    var allow = false;
    if (!!this.lastAction) {
      allow = this.lastAction.type == "START" || this.lastAction.type == "PONG";
    }
    return allow;
  }

  ping() {
    this.pingpongService
      .ping()
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
