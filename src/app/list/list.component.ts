import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { StateModel } from 'src/app/interfaces/state.interface';
import { AssignmentService } from '../services/assignment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityModel } from '../interfaces/city.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  stateList: StateModel[] = [];
  stateIDSub = new Subject<string>();
  stateID!: string;
  cityID!: string;

  constructor(private service: AssignmentService, private route: Router) {}
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
  }

  ngOnDestroy(): void {
    this.stateListSubscribe?.unsubscribe();
  }

  onSelectState() {
    if (this.stateCityForm.get('state')?.value) {
      this.stateID = this.stateCityForm.get('state')?.value;
      this.stateIDSub.next(this.stateCityForm.get('state')?.value);
    }
  }
  onSelectCity(idCity: string) {
    console.log('city ID ' + idCity);
    this.cityID = idCity;
  }

  onSubmit() {
    console.log('Submittable ' + this.stateID + '  ' + this.cityID);
    this.route.navigate(['result'], {
      queryParams: {
        stateId: this.stateID,
        cityId: this.cityID,
      },
    });
  }
}
