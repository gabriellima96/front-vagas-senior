import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(private http: HttpClient) {}

  getProfile(user: string, token: string) {
    return this.http
      .get(environment.api.getUserData + user, {
        headers: new HttpHeaders({
          Authorization: token
        })
      })
      .toPromise();
  }

  postSaveForm(obj, token) {
    return this.http
      .post(environment.api.saveForm, obj, {
        headers: new HttpHeaders({
          Authorization: token
        })
      })
      .toPromise();
  }
}
