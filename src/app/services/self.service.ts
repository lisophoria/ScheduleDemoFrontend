import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../models/user-info";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelfService {

  currentUserUrl = '/api/currentUser/self/'

  constructor(private http: HttpClient) { }

  getSelfInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.currentUserUrl + "info");
  }
}
