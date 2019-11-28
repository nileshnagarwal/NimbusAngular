import { Component, OnInit, Input } from '@angular/core';
import { EnquiryCardHelper } from '../../../common/functions/enquiry-card';
import { Enquiry } from '../../../common/interfaces/enquiry';

@Component({
  selector: 'ngx-enquiry-card-desktop',
  templateUrl: './enquiry-card-desktop.component.html',
  styleUrls: ['./enquiry-card-desktop.component.css'],
})
export class EnquiryCardDesktopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() enquiry: Enquiry;

  getLocality(enquiry: Enquiry, src_dest) {
    return EnquiryCardHelper.getLocality(enquiry, src_dest);
  }

  getVehicleIcon(vehicleType) {
    return EnquiryCardHelper.getVehicleIcon(vehicleType);
  }

}
