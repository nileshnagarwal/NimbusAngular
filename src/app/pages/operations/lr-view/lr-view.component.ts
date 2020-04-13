import { LrService } from './../../../common/services/operations/lr.service';
import { Component, OnInit, Input } from '@angular/core';
import { LR } from '../../../common/interfaces/lr';

@Component({
  selector: 'ngx-lr-view',
  templateUrl: './lr-view.component.html',
  styleUrls: ['./lr-view.component.scss'],
})
export class LrViewComponent implements OnInit {

  constructor(private lrService: LrService) { }

  ngOnInit() {
    if (this.lr['consignor_obj']) {
      this.consignor =  this.lr['consignor_obj']['client']['client'] + '\n' +
      this.lr['consignor_obj']['address'] + '\n' +
      this.lr.consignor_manual;
    } else {
      this.consignor = this.lr.consignor_manual;
    }
    if (this.lr['consignee_obj']) {
      this.consignee =  this.lr['consignee_obj']['client']['client'] + '\n' +
      this.lr['consignee_obj']['address'] + '\n' +
      this.lr.consignee_manual;
    } else {
      this.consignee = this.lr.consignee_manual;
    }
  }

  @Input() lrNo: number;
  @Input() lr: LR;

  consignor: string;
  consignee: string;

}
