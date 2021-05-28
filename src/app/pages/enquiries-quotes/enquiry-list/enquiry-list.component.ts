import { EnquiriesService } from '../../../common/services/enquiries-quotes/enquiries.service';
import { Component, OnInit, HostListener, Input } from '@angular/core';
import { pageSize } from '../../../common/misc/api-constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnquiriesViewComponent } from '../enquiries-view/enquiries-view.component';
import { EnquiryViewComponent } from './../enquiry-view/enquiry-view.component';
import { MiscService } from '../../../common/services/misc/misc.service';

@Component({
  selector: 'ngx-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.css'],
})
export class EnquiryListComponent implements OnInit {

  constructor(
    private enqService: EnquiriesService,
    private miscService: MiscService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.isMobile();
    this.loadNext();
  }

  @Input() enquiriesList = [];
  @Input() next: string = null;
  mobile: Boolean; // Keeps track if the screen if mobile or desktop
  loading = false;
  placeholders = [];
  pageToLoadNext = 1;
  enquiriesCount = 0;
  isResizing = false;

  // This function is triggered at the end of page scroll
  loadNext() {
    // If already loading, return
    if (this.loading) { return; }
    // If above conditions are not satisfied
    // Set loading to true
    this.loading = true;
    // Set placeholder size to pageSize. Placholders are not used for now
    this.placeholders = new Array(pageSize);

    // If input data has been provided, use the same.
    if (!(Array.isArray(this.enquiriesList)) || this.enquiriesList.length === 0) {
      // Load data for next page
      this.enqService.getEnquiry(this.next)
      .subscribe(res => {
        // Set next url
        this.next = res.body['next'];
        // Reset placeholder to blank array
        this.placeholders = [];
        // Set enquiriesList
        this.enquiriesList = [];
        this.enquiriesList = this.enquiriesList.concat(res['body']['results']);
        // Set loading to false
        this.loading = false;
        // Increment page count
        this.pageToLoadNext++;
      });
    } else {
      if (this.next) {
        this.miscService.getResUrl(this.next)
          .subscribe(res => {
            // Set next url
            this.next = res['body']['next'];
            // Reset placeholder to blank array
            this.placeholders = [];
            // Set enquiriesList
            this.enquiriesList = this.enquiriesList.concat(res['body']['results']);
            // Set loading to false
            this.loading = false;
            // Increment page count
            this.pageToLoadNext++;
          });
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

  // This function opens up a modal with the enquiry details filled in.
  viewEnquiry(enquiry) {
    const activeModal = this.modalService.open(
      EnquiryViewComponent,
      { size: 'lg', container: 'nb-layout' },
    );
    activeModal.componentInstance.enquiryId = enquiry['enquiry_id'];
    activeModal.componentInstance.isModalOpen = true;
    activeModal.componentInstance.modalRef = activeModal;
  }

}
