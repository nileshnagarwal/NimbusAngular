import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from './../../../common/services/masters/client.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { LrService } from '../../../common/services/operations/lr.service';
import { Client } from '../../../common/interfaces/client';
import { lrUniqueCheck } from '../../../common/validators/lr.validators';

@Component({
  selector: 'ngx-lr-engage',
  templateUrl: './lr-engage.component.html',
  styleUrls: ['./lr-engage.component.scss'],
})
export class LrEngageComponent implements OnInit {

  constructor(
    private service: LrService,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.clientService.getClientList()
      .subscribe(response => {
        this.clientOptions = response.body
          .map(responseMap => responseMap);
      });
  }

  @ViewChild('clientAutoComplete', { static: true }) clientAutoComplete: ElementRef;
  // Get reference of FormGroupDirective to reset form on submit
  @ViewChild(FormGroupDirective, { static: true }) lrEngageFormDir;

  clientOptions: Client[] = [];
  clientFilteredOptions: Client[];
  modalRef: NgbActiveModal;

  filter($event) {
    $event['type'] === 'click' ? '' : this.client_id.reset();
    const filterValue = $event['target']['value'];
    if (filterValue !== undefined) {
      this.clientFilteredOptions = this.clientOptions
        .filter(option => option.client.toLowerCase().includes(filterValue.toLowerCase()));
    }
  }

  clientDisplayFn(client) {
    return client ? client['client'] : null;
  }

  clientSelected($event) {
    this.client_id.setValue($event['option']['value']['client_id']);
  }



  lrEngageForm = new FormGroup({
    lr_no: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{1,}$'),
    ], lrUniqueCheck(this.service),
    ),
    client_id: new FormControl('', [
      Validators.required,
    ]),
    vehicle_no: new FormControl('', [
      Validators.pattern
        ('^[A-Z]{2}[0-9]{1,2}(?:[A-Z])?(?:[A-Z]*)?[0-9]{4}$'),
      Validators.maxLength(10),
    ]),
    },
  );

  // Check if LR has lrEngaged error to show relevant error
  isLrEngaged(): boolean {
    return this.lr_no.hasError('lrEngaged');
  }

  engageLr(lrEngageForm) {
    this.service.engageLR(lrEngageForm.value)
      .subscribe(response => {
        this.clearForm();
        if (this.modalRef) {
          this.modalRef.close(response);
        };
      });
  }

  clearForm() {
    this.lrEngageFormDir.resetForm();
    this.clientDisplayFn(null);
    this.client_id.setValue('');
    this.clientAutoComplete.nativeElement['value'] = '';
  }

  // The following get functions are used to describe
  // properties which can be used for cleaner code in html file.

  get lr_no() {
    return this.lrEngageForm.get('lr_no');
  }

  get client_id() {
    return this.lrEngageForm.get('client_id');
  }

  get vehicle_no() {
    return this.lrEngageForm.get('vehicle_no');
  }

}
