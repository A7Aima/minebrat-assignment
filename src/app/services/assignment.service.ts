import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CityModel } from '../interfaces/city.interface';
import { StateModel } from '../interfaces/state.interface';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(private http: HttpClient) {}

  selectedStateModel!: StateModel;

  cityListChange = new Subject<CityModel[]>();
  cityChange = new Subject<CityModel>();

  url = 'https://api.minebrat.com/api/v1';

  callStateList() {
    return this.http.get<StateModel[]>(this.url + '/states');
  }

  callCitiesList(stateId: string) {
    return this.http.get<CityModel[]>(this.url + '/states/cities/' + stateId);
  }
}
