import { EnquiriesService } from '../../../common/services/enquiries-quotes/enquiries.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { pageSize } from '../../../common/misc/api-constants';

@Component({
  selector: 'ngx-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.css'],
})
export class EnquiryListComponent implements OnInit {

  constructor(
    private service: EnquiriesService,
  ) { }

  ngOnInit() {
    this.isMobile();
    this.loadNext();
  }

  mobile: Boolean; // Keeps track if the screen if mobile or desktop
  enquiriesList = [];
  loading = false;
  placeholders = [];
  pageToLoadNext = 1;
  enquiriesCount = 0;
  isResizing = false;

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

  @HostListener('window:orientationchange', ['$event'])
    onOrientationChange(event) {
    this.isMobile();
  }

  @HostListener('window:resize', ['$event'])
    onResizing(event) {
    this.isMobile();
  }

  isMobile() {
    this.isResizing = true;
    // Check if mobile screen resolution
    if (window.screen.width < 1024) { // 768px portrait
      this.mobile = true;
    } else this.mobile = false;
    this.isResizing = false;
  }

}
