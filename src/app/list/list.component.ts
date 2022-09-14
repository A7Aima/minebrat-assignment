import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RemoteClientService } from 'src/app/source/remote-client.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(private client: RemoteClientService) {}
  stateSubscribe?: Subscription;

  ngOnInit(): void {
    this.stateSubscribe = this.client.getStatesList().subscribe();
  }
  ngOnDestroy(): void {
    this.stateSubscribe?.unsubscribe();
  }
}
