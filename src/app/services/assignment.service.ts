import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CityModel } from '../interfaces/city.interface';
import { StateModel } from '../interfaces/state.interface';
import { RemoteClientService } from '../source/remote-client.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(private client: RemoteClientService) {}

  stateList: StateModel[] = [];
  selectedStateModel = new Subject<StateModel>();
  stateListChange = new Subject<StateModel[]>();

  cityList: CityModel[] = [];
  selectedCityModel = new Subject<CityModel>();
  cityListChange = new Subject<CityModel[]>();
  cityListSub?: Subscription;
  stateListSub?: Subscription;

  getStates() {
    this.stateListSub = this.client.getStatesList().subscribe((res) => {
      this.stateList = res;
      this.stateListChange.next(this.stateList.slice());
    });
  }

  getCities(stateIdTemp: string) {
    // this.selectedStateModel.subscribe((value) => {
    this.cityListSub = this.client
      .getCitiesList(stateIdTemp)
      .subscribe((res) => {
        console.log(res);
        this.cityList = res;
        this.cityListChange.next(this.cityList.slice());
      });
    // this.cityListSub.unsubscribe();
    // });
  }

  onSelectState(index: number) {
    // this.selectedStateModel = undefined;
    // console.log('pressed');
    this.selectedStateModel.next(this.stateList[index]);
  }

  onSelectCity(index: number) {
    // this.selectedCityModel = undefined;
    // console.log('pressed');
    this.selectedCityModel.next(this.cityList[index]);
  }
}
