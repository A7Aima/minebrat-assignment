import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityModel } from '../interfaces/city.interface';
import { StateModel } from '../interfaces/state.interface';

@Injectable({
  providedIn: 'root',
})
export class RemoteClientService {
  url = 'https://api.minebrat.com/api/v1';

  constructor(private http: HttpClient) {}

  getStatesList() {
    return this.http.get<StateModel[]>(this.url + '/states');
  }

  getCitiesList(stateId: string) {
    return this.http.get<CityModel[]>(this.url + '/states/cities/' + stateId);
  }
}
