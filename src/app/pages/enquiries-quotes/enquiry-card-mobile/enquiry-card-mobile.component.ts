import { Component, OnInit, Input } from '@angular/core';
import { Enquiry } from '../../../common/interfaces/enquiry';
import { EnquiryHelper } from '../../../common/functions/enquiry-helper';

@Component({
  selector: 'ngx-enquiry-card-mobile',
  templateUrl: './enquiry-card-mobile.component.html',
  styleUrls: ['./enquiry-card-mobile.component.css'],
})
export class EnquiryCardMobileComponent implements OnInit {

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
