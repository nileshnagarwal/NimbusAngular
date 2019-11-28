import { Component, OnInit, Input } from '@angular/core';
import { Enquiry } from '../../../common/interfaces/enquiry';
import { EnquiryCardHelper } from '../../../common/functions/enquiry-card';

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
    return EnquiryCardHelper.getLocality(enquiry, src_dest);
  }

  getVehicleIcon(vehicleType) {
    return EnquiryCardHelper.getVehicleIcon(vehicleType);
  }

}
