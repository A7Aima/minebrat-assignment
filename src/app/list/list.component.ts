import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RemoteClientService } from 'src/app/source/remote-client.service';
import { StateModel } from 'src/app/interfaces/state.interface';
import { AssignmentService } from '../services/assignment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  stateList: StateModel[] = [];
  selectedStateModel?: StateModel;
  isNotSubmit: boolean = true;

  constructor(private service: AssignmentService) {}
  stateListSubscribe?: Subscription;
  stateSubscribe?: Subscription;
  submitSubscribe?: Subscription;

  stateCityForm = new FormGroup({
    state: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.service.getStates();
    this.stateListSubscribe = this.service.stateListChange.subscribe((res) => {
      this.stateList = res;
    });
    this.stateSubscribe = this.service.selectedStateModel.subscribe((res) => {
      this.service.getCities(res.stateId);
    });
    this.submitSubscribe = this.service.isNotSubmittable.subscribe((value) => {
      this.isNotSubmit = value;
    });
  }
  ngOnDestroy(): void {
    this.stateListSubscribe?.unsubscribe();
    this.stateSubscribe?.unsubscribe();
    this.submitSubscribe?.unsubscribe();
  }

  onSelectState(index: number) {
    this.service.onSelectState(index);
  }

  onSubmit() {
    console.log('Submittable');
  }
}
