import { EnquiriesService } from '../../../common/services/enquiries-quotes/enquiries.service';
import { Component, OnInit, HostListener, Input } from '@angular/core';
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

  ngOnChanges(changes) {
    console.log('CHANGES', changes);
  }


  @Input() enquiriesList = [];
  @Input() cursor: string = null;
  mobile: Boolean; // Keeps track if the screen if mobile or desktop
  loading = false;
  placeholders = [];
  pageToLoadNext = 1;
  enquiriesCount = 0;
  isResizing = false;

  // This function is triggered at the end of page scroll
  loadNext() {
    console.log('Executing loadNext()');
    console.log('Enquiries List before execution: ', this.enquiriesList);
    console.log('Cursor before execution: ', this.cursor);
    console.log('Loading: ', this.loading);
    // If already loading, return
    if (this.loading) { return; }

    // If above conditions are not satisfied
    // Set loading to true
    this.loading = true;
    // Set placeholder size to pageSize. Placholders are not used for now
    this.placeholders = new Array(pageSize);
    
    // If input data has been provided, use the same.
    if (!(Array.isArray(this.enquiriesList)) || this.enquiriesList.length === 0) {
      console.log('Enquiries list empty');
      // Load data for next page
      this.service.getEnquiry(this.cursor)
      .subscribe(res => {
        // Set Cursor
        const searchParams = new URLSearchParams(res['body']['next'].toString().split('?')[1]);
        this.cursor = searchParams.get('cursor');
        console.log('Cursor: ', this.cursor);
        // Reset placeholder to blank array
        this.placeholders = [];
        // Set enquiriesList
        this.enquiriesList = [];
        this.enquiriesList = this.enquiriesList.concat(res['body']['results']);
        // Set loading to false
        this.loading = false;
        console.log('Loading changed to: ', this.loading);
        // Increment page count
        this.pageToLoadNext++;
        console.log('Exiting Block 1');
      });
    } else {
      console.log('Enquiries List: ', this.enquiriesList);
      if (this.cursor) {
        console.log('Cursor Found. Adding new page');
        this.service.getEnquiry(this.cursor)
          .subscribe(res => {
            console.log('New Page request res: ', res);
            // Set Cursor
            const next = res['body']['next'];
            if (next) {
              const searchParams = new URLSearchParams(res['body']['next'].toString().split('?')[1]);
              this.cursor = searchParams.get('cursor');
            } else this.cursor = null;
            console.log('Cursor: ', this.cursor);
            // Reset placeholder to blank array
            this.placeholders = [];
            console.log('Enquiries List before revising', this.enquiriesList);
            // Set enquiriesList
            this.enquiriesList = this.enquiriesList.concat(res['body']['results']);
            console.log('EnquiriesList Revised: ', this.enquiriesList);
            // Set loading to false
            this.loading = false;
            console.log('Loading changed to: ', this.loading);
            // Increment page count
            this.pageToLoadNext++;
            console.log('Exiting Block 2');
          })
      } else {
        this.loading = false;
        return;
      } 
    }
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
