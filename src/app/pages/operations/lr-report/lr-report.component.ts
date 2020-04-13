import { LrViewComponent } from './../lr-view/lr-view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { LrService } from './../../../common/services/operations/lr.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-lr-report',
  templateUrl: './lr-report.component.html',
  styleUrls: ['./lr-report.component.scss'],
})
export class LrReportComponent implements OnInit {

  constructor(
    private LrService: LrService,
    private datePipe: DatePipe,
    private modalService: NgbModal) {}

  ngOnInit() {
    this.LrService.lrList()
      .subscribe(response => {
        this.source.load(response.body);
      });
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      lr_no_id: {
        title: 'LR No',
        type: 'number',
      },
      date: {
        title: 'LR Date',
        type: 'date',
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);
  
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      },      
      vehicle_no: {
        title: 'Vehicle No',
        type: 'string',
      },
      dispatch_from: {
        title: 'From',
        type: 'string',
      },
      ship_to: {
        title: 'To',
        type: 'string',
      },
    },
    actions: {
      add : false,
      edit: false,
      delete: false,
    },
  };

  source: LocalDataSource = new LocalDataSource();

  viewLr(event) {
    console.log(event);
    const modal = this.modalService.open(
      LrViewComponent,
      { size: 'lg', container: 'nb-layout' },
    );
    modal.componentInstance.lr = event.data;
  }
}
