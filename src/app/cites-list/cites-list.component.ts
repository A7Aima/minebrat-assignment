import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CityModel } from '../interfaces/city.interface';
import { StateModel } from '../interfaces/state.interface';
import { AssignmentService } from '../services/assignment.service';
import { RemoteClientService } from '../source/remote-client.service';

@Component({
  selector: 'app-cites-list',
  templateUrl: './cites-list.component.html',
  styleUrls: ['./cites-list.component.scss'],
})
export class CitesListComponent implements OnInit, OnDestroy {
  cityList: CityModel[] = [];

  constructor(private service: AssignmentService) {}

  citySubscribe?: Subscription;

  ngOnInit(): void {
    this.service.cityListChange.subscribe((res) => {
      this.cityList = res;
    });
  }

  ngOnDestroy(): void {
    this.citySubscribe?.unsubscribe();
  }

  onSelectCity(index: number) {
    this.service.onSelectCity(index);
  }
}
