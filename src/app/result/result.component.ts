import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssignmentService } from '../services/assignment.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  stateName: String = 'Not yet selected';
  cityName: String = 'not yet selected';
  isVerified: boolean = false;
  results = new Subscription();
  stateSubscribe = new Subscription();
  citySubscribe = new Subscription();
  constructor(
    private activeRoute: ActivatedRoute,
    private service: AssignmentService
  ) {}

  ngOnInit(): void {
    if (this.activeRoute !== undefined) {
      this.results = this.activeRoute.queryParams.subscribe((params) => {
        //fetching parameters
        this.stateSubscribe = this.service.callStateList().subscribe((resS) => {
          //fetching states
          this.stateName =
            resS.find((stateT) => stateT.stateId === params['stateId'])
              ?.stateName ?? 'Not Fetched';

          this.citySubscribe = this.service
            .callCitiesList(params['stateId'])
            .subscribe((resC) => {
              //fetching cties
              this.cityName =
                resC.find((cityT) => cityT.cityId === params['cityId'])
                  ?.cityName ?? 'Not Fetched';
              this.isVerified = true;
            });
        });
        // this.stateName = params['stateName'];
        // this.cityName = params['cityName'];
      });
    }
    // console.log('result page' + this.service.selectedStateModel);s
    // if (this.service.selectedStateModel && this.service.selectedCityModel) {
    //   this.stateName = this.service.selectedStateModel.stateName;
    //   this.cityName = this.service.selectedCityModel.cityName;
    //   this.isVerified = true;
    // }
  }
}
