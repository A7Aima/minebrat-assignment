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

  stateList: StateModel[] = [];
  selectedStateModel!: StateModel;
  stateListChange = new Subject<StateModel[]>();

  cityList: CityModel[] = [];
  selectedCityModel!: CityModel;
  cityListChange = new Subject<CityModel[]>();
  cityListSub?: Subscription;
  stateListSub?: Subscription;

  getStates() {
    this.stateListSub = this.getStatesCall().subscribe((res) => {
      this.stateList = res;
      this.stateListChange.next(this.stateList.slice());
    });
  }

  getCities(stateIdTemp: string) {
    this.cityListSub = this.getCitiesCall(stateIdTemp).subscribe((res) => {
      console.log(res);
      this.cityList = res;
      this.cityListChange.next(this.cityList.slice());
    });
  }

  onSelectState(index: number) {
    this.selectedStateModel = this.stateList[index];
    this.getCities(this.selectedStateModel.stateId);
  }

  onSelectCity(index: number) {
    this.selectedCityModel = this.cityList[index];
  }

  url = 'https://api.minebrat.com/api/v1';

  getStatesCall() {
    return this.http.get<StateModel[]>(this.url + '/states');
  }

  getCitiesCall(stateId: string) {
    return this.http.get<CityModel[]>(this.url + '/states/cities/' + stateId);
  }
}
