import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateModel } from 'src/app/interfaces/state.interface';
import { AssignmentService } from '../services/assignment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityModel } from '../interfaces/city.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  stateList: StateModel[] = [];
  selectedStateModel?: StateModel;
  selectedCityModel?: CityModel;

  constructor(
    private service: AssignmentService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {}
  stateListSubscribe?: Subscription;

  stateCityForm = new FormGroup({
    state: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.service.callStateList().subscribe((res) => {
      // console.log(res);
      this.stateList = res;
    });
    this.service.cityChange.subscribe((res) => {
      this.selectedCityModel = res;
    });
  }

  ngOnDestroy(): void {
    this.stateListSubscribe?.unsubscribe();
  }

  onSelectState() {
    if ((<FormControl>this.stateCityForm.get('state')).value) {
      // console.log(
      //   'StateId ' + (<FormControl>this.stateCityForm.get('state')).value
      // );
      this.selectedStateModel = this.stateList.find(
        (s) =>
          s.stateId === (<FormControl>this.stateCityForm.get('state')).value
      );
      this.service
        .callCitiesList((<FormControl>this.stateCityForm.get('state')).value)
        .subscribe((res) => {
          console.log(res);
          this.service.cityListChange.next(res);
        });
    }
  }

  onSubmit() {
    console.log(
      'Submittable ' +
        this.selectedStateModel?.stateName +
        this.selectedCityModel?.cityName
    );
    // this.route.navigate(['result']);
  }
}
