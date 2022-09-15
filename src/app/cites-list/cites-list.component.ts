import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
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
  @Input() stateId!: Observable<string>;
  @Output() cityId = new EventEmitter<string>();
  cityList: CityModel[] = [];

  constructor(private service: AssignmentService) {}

  citySubscribe?: Subscription;

  ngOnInit(): void {
    this.stateId.subscribe((idState) => {
      this.citySubscribe = this.service
        .callCitiesList(idState)
        .subscribe((resC) => {
          this.cityList = resC;
        });
    });
  }

  ngOnDestroy(): void {
    this.citySubscribe?.unsubscribe();
  }

  onSelectCity() {
    if ((<FormControl>this.parentForm.get('city')).value) {
      console.log((<FormControl>this.parentForm.get('city')).value);
      this.cityId.emit((<FormControl>this.parentForm.get('city')).value);
    }
  }
}
