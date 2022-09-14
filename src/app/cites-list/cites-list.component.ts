import { Component, Input, OnInit } from '@angular/core';
import { StateModel } from '../interfaces/state.interface';
import { RemoteClientService } from '../source/remote-client.service';

@Component({
  selector: 'app-cites-list',
  templateUrl: './cites-list.component.html',
  styleUrls: ['./cites-list.component.scss'],
})
export class CitesListComponent implements OnInit {
  @Input('selectState') selectedState: StateModel | undefined;
  constructor(private client: RemoteClientService) {}

  ngOnInit(): void {
    this.selectedState;
    this.client.getCitiesList(this.selectedState!.stateId).subscribe((res) => {
      console.log(res);
    });
  }
}
