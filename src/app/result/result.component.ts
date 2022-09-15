import { Component, OnInit } from '@angular/core';
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
  constructor(private service: AssignmentService) {}

  ngOnInit(): void {
    // console.log('result page' + this.service.selectedStateModel);s
    // if (this.service.selectedStateModel && this.service.selectedCityModel) {
    //   this.stateName = this.service.selectedStateModel.stateName;
    //   this.cityName = this.service.selectedCityModel.cityName;
    //   this.isVerified = true;
    // }
  }
}
