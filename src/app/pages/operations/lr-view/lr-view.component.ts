import { Component, OnInit, Input } from '@angular/core';
import { LR } from '../../../common/interfaces/lr';

@Component({
  selector: 'ngx-lr-view',
  templateUrl: './lr-view.component.html',
  styleUrls: ['./lr-view.component.css'],
})
export class LrViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (this.lr['consignor_obj']) {
      this.consignor =  this.lr['consignor_obj']['client']['client'] + '\n' +
      this.lr['consignor_obj']['address'];
      if (this.lr.consignor_manual) {
        this.consignor = this.consignor + '\n' + this.lr.consignor_manual;
      }
    } else {
      this.consignor = this.lr.consignor_manual;
    }
    if (this.lr['consignee_obj']) {
      this.consignee =  this.lr['consignee_obj']['client']['client'] + '\n' +
      this.lr['consignee_obj']['address'];
      if (this.lr.consignee_manual) {
        this.consignee = this.consignee + '\n' + this.lr.consignee_manual;
      }
    } else {
      this.consignee = this.lr.consignee_manual;
    }
    this.printTitle = 'LR No. ' + this.lr['lr_no_id'];
  }

  @Input() lrNo: number;
  @Input() lr: LR;

  consignor: string;
  consignee: string;
  printTitle: string;

}
