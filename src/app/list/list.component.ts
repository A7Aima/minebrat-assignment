import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RemoteClientService } from 'src/app/source/remote-client.service';
import { StateModel } from 'src/app/interfaces/state.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  stateList: StateModel[] = [];
  selectedStateModel?: StateModel;

  constructor(private client: RemoteClientService) {}
  stateSubscribe?: Subscription;

  ngOnInit(): void {
    this.stateSubscribe = this.client.getStatesList().subscribe(
      (res) => {
        this.stateList = res;
        console.log(this.stateList);
      }
      // (error) => {
      //   console.log(error);
      // }
    );
  }
  ngOnDestroy(): void {
    this.stateSubscribe?.unsubscribe();
  }

  onSelectState(index: number) {
    this.selectedStateModel = undefined;
    console.log('pressed');
    this.selectedStateModel = this.stateList[index];
  }
}
