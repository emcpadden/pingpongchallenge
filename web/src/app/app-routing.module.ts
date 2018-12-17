import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionListComponent } from './action-list/action-list.component';
import { PingComponent } from './ping/ping.component';
import { PongComponent } from './pong/pong.component';

const routes: Routes = [
  {
    path: '',
    component: ActionListComponent
  },
  {
    path: 'ping',
    component: PingComponent
  },
  {
    path: 'pong',
    component: PongComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
