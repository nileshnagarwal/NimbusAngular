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
    this.lrService.viewLr(this.lrNo)
      .subscribe(res => {
        this.lr = res.body;
      });
  }

  @Input() lrNo: number;
  lr: LR;

}
