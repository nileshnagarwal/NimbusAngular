import { EnquiriesService } from './../../../common/services/enquiries-quotes/enquiries.service';
import { Component } from '@angular/core';
import { Enquiry } from '../../../common/interfaces/enquiry';
import { pageSize } from '../../../common/misc/api-constants';

@Component({
  selector: 'ngx-enquiry-summary-card',
  templateUrl: './enquiry-summary-card.component.html',
  styleUrls: ['./enquiry-summary-card.component.css'],
})
export class EnquirySummaryCardComponent {

  constructor(
    private service: EnquiriesService,
  ) { }

  enquiriesList = [];
  loading = false;
  placeholders = [];
  pageToLoadNext = 1;
  enquiriesCount = 0;

  // This function is triggered at the end of page scroll
  loadNext() {
    // If already loading, return
    if (this.loading) { return; }

    // If the count of enquiries has already been covered and page is over 1, return
    if (this.enquiriesCount - ((this.pageToLoadNext - 1) * pageSize) < 0
        && this.pageToLoadNext > 1) { return; }

    // If above 2 conditions are not satisfied
    // Set loading to true
    this.loading = true;
    // Set placeholder size to pageSize. Placholders are not used for now
    this.placeholders = new Array(pageSize);
    // Load data for next page
    this.service.getEnquiry(this.pageToLoadNext)
      .subscribe(res => {
        // Set enquiriesCount
        this.enquiriesCount = +res['body']['count'];
        // Reset placeholder to blank array
        this.placeholders = [];
        // Set enquiriesList
        this.enquiriesList = this.enquiriesList.concat(res['body']['results']);
        // Set loading to false
        this.loading = false;
        // Increment page count
        this.pageToLoadNext++;
      });
  }

  getLocality(enquiry: Enquiry, src_dest) {
    // Check if source or destination
    if (src_dest === 'source') {
      // If sublocality_level_1 is not null return it
      if (enquiry.places_source_obj[0]['sublocality_level_1'] != null) {
        return enquiry.places_source_obj[0]['sublocality_level_1'];
      // Else check if locality is defined, return it
      } else if (enquiry.places_source_obj[0]['locality'] != null) {
        return enquiry.places_source_obj[0]['locality'];
      // Else return administrative_level_2 which is district
      } else return enquiry.places_source_obj[0]['administrative_area_level_2'];
    // Same as source algo
    } else if (src_dest === 'destination') {
      if (enquiry.places_destination_obj[0]['sublocality_level_1'] != null) {
        return enquiry.places_destination_obj[0]['sublocality_level_1'];
      } else if (enquiry.places_destination_obj[0]['locality'] != null) {
        return enquiry.places_destination_obj[0]['locality'];
      } else return enquiry.places_destination_obj[0]['administrative_area_level_2'];
    } else return null;
  }
}
