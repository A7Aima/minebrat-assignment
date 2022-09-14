import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RemoteClientService } from 'src/app/source/remote-client.service';
import { StateModel } from 'src/app/interfaces/state.interface';
import { AssignmentService } from '../services/assignment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  stateList: StateModel[] = [];
  selectedStateModel?: StateModel;

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
    this.service.getStates();
    this.stateListSubscribe = this.service.stateListChange.subscribe((res) => {
      this.stateList = res;
    });
  }
  ngOnDestroy(): void {
    this.stateListSubscribe?.unsubscribe();
  }

  onSelectState() {
    if ((<FormControl>this.stateCityForm.get('state')).value) {
      this.service.onSelectState(
        (<FormControl>this.stateCityForm.get('state')).value
      );
      this.service.getCities(
        (<FormControl>this.stateCityForm.get('state')).value
      );
    }
  }

  onSubmit() {
    console.log('Submittable');
    this.route.navigate(['result']);
  }
}
