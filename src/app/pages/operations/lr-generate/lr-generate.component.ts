import { LrEngageComponent } from './../lr-engage/lr-engage.component';
import { ClientService } from './../../../common/services/masters/client.service';
import { LrService } from './../../../common/services/operations/lr.service';
import { FormGroup, FormControl, Validators, FormArray, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LR } from '../../../common/interfaces/lr';
import { ClientAddress } from '../../../common/interfaces/client-address';
import { NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'ngx-lr-generate',
  templateUrl: './lr-generate.component.html',
  styleUrls: ['./lr-generate.component.css'],
})
export class LrGenerateComponent implements OnInit {

  constructor(
    private lrService: LrService,
    private clientService: ClientService,
    private toastrService: NbToastrService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.lrService.getLrNo()
      .subscribe(res => {
        this.lrNoOptions = res.body;
      })
    
    this.addItem();
  }
  
  @ViewChild('consignorFinal', { static: true }) consignorFinal: ElementRef;
  @ViewChild('consigneeFinal', { static: true }) consigneeFinal: ElementRef;

  @ViewChild(FormGroupDirective, { static: true }) LrGenFormDir;

  lrNoOptions: LR[] = []
  clientAddressOptions: ClientAddress[] = []
  client: string;
  consignorAddress: string;
  consigneeAddress: string;
  
  lrGenForm = new FormGroup({
    lr_no_id: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    vehicle_no: new FormControl('', [
      Validators.required,
      Validators.pattern
        ('^[A-Z]{2}[0-9]{1,2}(?:[A-Z])?(?:[A-Z]*)?[0-9]{4}$'),
    ]),
    dispatch_from: new FormControl('', Validators.required),
    ship_to: new FormControl('', Validators.required),
    consignor_id: new FormControl(''),
    consignee_id: new FormControl(''),
    consignor_manual: new FormControl(''),
    consignee_manual: new FormControl(''),
    consignor_gstin: new FormControl(''),
    consignee_gstin: new FormControl(''),
    items: new FormArray([]),
    invoice_no: new FormControl(''),
    invoice_date: new FormControl(''),
    boe_no: new FormControl(''),
    boe_date: new FormControl(''),
    dc_no: new FormControl(''),
    dc_date: new FormControl(''),
    value: new FormControl('', Validators.required),
    ewaybill_no: new FormControl(''),
    comment: new FormControl(''),
    size: new FormControl(''),
    weight: new FormControl(''),
  })

  lrNoSelected(event?, lr?) {
    if (event && !lr) {
      console.log("1")
      // Get LR Object using the lr_no received in event
      lr = this.lrNoOptions.find(i => i.lr_no === event.value);
    }
    if (!event && !lr) {
      return error("lrNoSelected requires either event or lr argument.")
    }
    console.log(lr)
    // Get vehicle_no and client_id from lr object
    const vehicle_no = lr.vehicle_no;
    const client_id = lr.client_id;
    console.log(client_id, ' | ', vehicle_no);
    // Set the value of vehicle_no formcontrol
    this.vehicle_no.setValue(vehicle_no);
    // Get client address for the client to whome the 
    // selected lr is engaged to
    this.clientService.getClientAddressByClientId(client_id)
      .subscribe(res => {
        this.clientAddressOptions = res.body;
      });
    // Set the client string from lr obj
    this.client = lr['client']['client'];
  }

  consignorSelected(event) {
    if (event.value === undefined) {
      this.consignorFinal.nativeElement['value'] = this.consignor_manual.value;
    }
    else {
      const consignorAddressObj = this.clientAddressOptions.
        find(i => i.client_address_id === event.value);
      this.consignorAddress = consignorAddressObj.address;
      this.consignorFinal.nativeElement['value'] = this.client + '. ' + 
        this.consignorAddress + '\n' + this.consignor_manual.value;
      this.consignor_gstin.setValue(consignorAddressObj.gstin);
    }
  }

  consigneeSelected(event) {
    if (event.value === undefined) {
      this.consigneeFinal.nativeElement['value'] = this.consignee_manual.value;
    }
    else {
      const consigneeAddressObj = this.clientAddressOptions.
        find(i => i.client_address_id === event.value);
      this.consigneeAddress = consigneeAddressObj.address;
      this.consigneeFinal.nativeElement['value'] = this.client + '. ' + 
        this.consigneeAddress + '\n' + this.consignee_manual.value;
      this.consignee_gstin.setValue(consigneeAddressObj.gstin);
    }
  }

  consignorManualChanged(event) {
    console.log(event);
    if (event.data === undefined) {
      this.consignorFinal.nativeElement['value'] = this.consignor_manual.value;
    }
    else {
      this.consignorFinal.nativeElement['value'] = this.client + '. ' +
        this.consignorAddress + '\n' + this.consignor_manual.value;
    }
  }

  consigneeManualChanged(event) {
    if (event.data === undefined) {
      this.consigneeFinal.nativeElement['value'] = this.consignee_manual.value;  
    }
    else {
      this.consigneeFinal.nativeElement['value'] = this.client + '. ' +
        this.consigneeAddress + '\n' + this.consignee_manual.value;
    }
  }

  addItem() {
    // add source to the list
    this.items.push(new FormGroup({
      packing_type: new FormControl(''),
      no_of_pkg: new FormControl(''),
      description: new FormControl('', Validators.required),
    }));
  }

  removeItem(item) {
    // remove source from the list
    // <FormArray> means 'as FormArray'. This is alternative way to
    // the method used in addSource()
    const index = this.items.controls.indexOf(item);
    this.items.removeAt(index);
  }

  genLR(lrGenForm) {
    this.lrService.generateLR(lrGenForm.value)
      .subscribe(res => {
        this.toastrShow('success', false, 'bell', '3000', 'top-right');
        this.clearForm();
      })
  }

  clearForm() {
    this.LrGenFormDir.resetForm();
    this.lr_no_id.setValue('');
    this.consignor_id.setValue('');
    this.consignee_id.setValue('');
  }

  engageLr() {
    // event.stopPropagation is used to avoid triggering
    // the opening of dropdown panel
    event.stopPropagation();

    const modal = this.modalService.open(
      LrEngageComponent,
      { size: 'lg', container: 'nb-layout' },
    );
    modal.componentInstance.modalRef = modal;
    modal.result
      .then(res => 
        {
          console.log(res);
          this.lrNoSelected(null, res.body);
          this.lr_no_id.setValue(res.body['lr_no']);
          this.lrNoOptions.push(res.body);
          }
      )
      .catch(rejection => {});
  }

  // Trigger toastr for showing subscription complete message
  toastrShow(status, preventDuplicates, icon, duration, position) {
    this.toastrService.show('',
    'LR Generated',
      {status, preventDuplicates, icon, duration, position},
    );
  }

  get lr_no_id() {
    return this.lrGenForm.get('lr_no_id');
  }

  get date() {
    return this.lrGenForm.get('date');
  }

  get vehicle_no() {
    return this.lrGenForm.get('vehicle_no');
  }

  get dispatch_from() {
    return this.lrGenForm.get('dispatch_from');
  }

  get ship_to() {
    return this.lrGenForm.get('ship_to');
  }

  get consignor_id() {
    return this.lrGenForm.get('consignor_id');
  }

  get consignee_id() {
    return this.lrGenForm.get('consignee_id');
  }

  get consignor_manual() {
    return this.lrGenForm.get('consignor_manual');
  }

  get consignee_manual() {
    return this.lrGenForm.get('consignee_manual');
  }

  get consignor_gstin() {
    return this.lrGenForm.get('consignor_gstin');
  }

  get consignee_gstin() {
    return this.lrGenForm.get('consignee_gstin');
  }

  get items() {
    return this.lrGenForm.get('items') as FormArray;
  }

  get invoice_no() {
    return this.lrGenForm.get('invoice_no');
  }

  get invoice_date() {
    return this.lrGenForm.get('invoice_date');
  }

  get boe_no() {
    return this.lrGenForm.get('boe_no');
  }

  get boe_date() {
    return this.lrGenForm.get('boe_date');
  }

  get dc_no() {
    return this.lrGenForm.get('dc_no');
  }

  get dc_date() {
    return this.lrGenForm.get('dc_date');
  }

  get value() {
    return this.lrGenForm.get('value');
  }

  get ewaybill_no() {
    return this.lrGenForm.get('ewaybill_no');
  }

  get comment() {
    return this.lrGenForm.get('comment');
  }

  get size() {
    return this.lrGenForm.get('size');
  }

  get weight() {
    return this.lrGenForm.get('weight');
  }

}
