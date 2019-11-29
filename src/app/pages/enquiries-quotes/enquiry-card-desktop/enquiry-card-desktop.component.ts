import { Component, OnInit, Input } from '@angular/core';
import { EnquiryHelper } from '../../../common/functions/enquiry-helper';
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
    return EnquiryHelper.getLocality(enquiry, src_dest);
  }

  getVehicleIcon(vehicleType) {
    return EnquiryHelper.getVehicleIcon(vehicleType);
  }

}
