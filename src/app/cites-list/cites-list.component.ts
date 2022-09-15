import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { CityModel } from '../interfaces/city.interface';
import { AssignmentService } from '../services/assignment.service';

@Component({
  selector: 'app-cites-list',
  templateUrl: './cites-list.component.html',
  styleUrls: ['./cites-list.component.scss'],
})
export class CitesListComponent implements OnInit, OnDestroy {
  @Input()
  parentForm!: FormGroup;
  cityList: CityModel[] = [];

  constructor(private service: AssignmentService) {}

  citySubscribe?: Subscription;

  ngOnInit(): void {
    this.citySubscribe = this.service.cityListChange.subscribe((res) => {
      this.cityList = res;
    });
  }

  ngOnDestroy(): void {
    this.citySubscribe?.unsubscribe();
  }

  onSelectCity() {
    if ((<FormControl>this.parentForm.get('city')).value) {
      console.log((<FormControl>this.parentForm.get('city')).value);
      this.service.cityChange.next(
        this.cityList[(<FormControl>this.parentForm.get('city')).value]
      );
    }
  }
}
