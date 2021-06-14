import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../../../common/interfaces/quote';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ngx-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.css'],
})
export class QuoteCardComponent implements OnInit {

  constructor(
    private currencyPipe: CurrencyPipe,
  ) { }

  @Input() quote: Quote;

  freight_11: number|string;
  freight_12: number|string;
  freight_21: number|string;
  freight_22: number|string;

  currencyCode: string = 'INR';
  display: string = 'symbol';
  digitsInfo: string = '1.0-0';
  locale: string = 'en-IN';

  vehicleTypeList = [];
  vehicleTypeToolTip: string;

  ngOnInit() {
    if (this.quote.freight_normal_org) {
      if (this.quote.freight_normal_rev) {
        this.freight_12 = this.currencyPipe.
          transform(this.quote.freight_normal_rev, this.currencyCode, this.display, this.digitsInfo, this.locale);
        this.freight_22 = this.currencyPipe.
          transform(this.quote.freight_normal_org, this.currencyCode, this.display, this.digitsInfo, this.locale);
      } else {
        this.freight_12 = this.currencyPipe.
          transform(this.quote.freight_normal_org, this.currencyCode, this.display, this.digitsInfo, this.locale);
        this.freight_22 = '----';
      }
    } else {
      if (this.quote.freight_incl_org) {
        if (this.quote.freight_incl_rev) {
          this.freight_12 = this.currencyPipe.
            transform(this.quote.freight_incl_rev, this.currencyCode, this.display, this.digitsInfo, this.locale)
            + ' Incl';
          this.freight_22 = this.currencyPipe.
            transform(this.quote.freight_incl_org, this.currencyCode, this.display, this.digitsInfo, this.locale)
            + ' Org';
        } else {
          this.freight_12 = this.currencyPipe.
            transform(this.quote.freight_incl_org, this.currencyCode, this.display, this.digitsInfo, this.locale)
            + ' Incl';
          this.freight_22 = '----';
        }
      }
      if (this.quote.freight_excl_org) {
        if (this.quote.freight_excl_rev) {
          this.freight_11 = this.currencyPipe.
            transform(this.quote.freight_excl_rev, this.currencyCode, this.display, this.digitsInfo, this.locale)
            + ' Excl';
          this.freight_21 = this.currencyPipe.
            transform(this.quote.freight_excl_org, this.currencyCode, this.display, this.digitsInfo, this.locale)
            + ' Org';
        } else {
          this.freight_11 = this.currencyPipe.
            transform(this.quote.freight_excl_org, this.currencyCode, this.display, this.digitsInfo, this.locale)
            + ' Excl';
          this.freight_21 = '----';
        }
      }  else {
        this.freight_11 = '----';
        this.freight_21 = '----';
      }
    }

    this.generateVehicleTypeList();
  }

  generateVehicleTypeList() {
    for (const vehicle_type of this.quote.vehicle_type_obj) {
      this.vehicleTypeList.push(vehicle_type['vehicle']);
      this.vehicleTypeToolTip = this.vehicleTypeList.join(' | ');
    }
  }

}
