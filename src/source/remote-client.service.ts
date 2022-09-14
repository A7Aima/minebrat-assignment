import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RemoteClientService {
  url = 'http://api.minebrat.com/api/v1/';

  constructor(private http: HttpClient) {}

  getStatesList() {
    return this.http.get(this.url + 'states');
  }

  getCitiesList(stateId: number) {
    return this.http.get(this.url + 'states/cities/' + stateId);
  }
}
