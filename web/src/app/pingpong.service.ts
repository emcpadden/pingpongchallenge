import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action } from './action.model';

@Injectable({
  providedIn: 'root'
})
export class PingpongService {

  BASE_URL = "/api";

  constructor(private http: HttpClient) { }

  ping(): Observable<Action> {
    return this.http.post<Action>(`${this.BASE_URL}/ping`, {});
  }

  pong(): Observable<Action> {

    return this.http.post<Action>(`${this.BASE_URL}/pong`, {});

  }

  getLastAction(): Observable<Action>  {
    return this.http.get<Action>(`${this.BASE_URL}/lastAction`);
  }

  getActions(): Observable<Action[]>  {
    return this.http.get<Action[]>(`${this.BASE_URL}/actions`);
  }

}
