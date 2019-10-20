import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { VehicleBodyService } from '../../../common/services/masters/vehicle-body.service';

@Component({
  selector: 'ngx-vehicle-body',
  templateUrl: './vehicle-body.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class VehicleBodyComponent implements OnInit {

  constructor(private service: VehicleBodyService) {}

  // refreshTable emitter is created to trigger the service.get
  // function in the Table Component to refresh the data
  @Output() refreshTable = new EventEmitter();

  ngOnInit() {}

  addVehicleBody(vehicleBodyForm: NgForm) {
    this.service.addVehicleBody(vehicleBodyForm.value)
      .subscribe(response => {
        this.refreshTable.emit();
      });
    vehicleBodyForm.reset();
  }

}
