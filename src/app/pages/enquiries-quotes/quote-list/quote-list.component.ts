import { Component, OnInit, Input } from '@angular/core';
import { QuotesService } from './../../../common/services/enquiries-quotes/quotes.service';
import { Quote } from '../../../common/interfaces/quote';
import { QuotesHelper } from '../../../common/functions/quotes-helper';

@Component({
  selector: 'ngx-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css'],
})
export class QuoteListComponent implements OnInit {

  // Used to get quotes for a given enquiry only
  @Input('enquiry_id') enquiry_id: number;
  quotes: Quote[];

  constructor(
      private service: QuotesService,
  ) { }

  ngOnInit() {
    this.service.getQuoteByEnquiry(this.enquiry_id)
    .subscribe(response => {
      this.quotes = QuotesHelper.quotePropToString(response.body);
    });

  }

}
