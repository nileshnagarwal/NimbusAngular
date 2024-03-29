import { Observable } from 'rxjs';
import { LR } from './../../interfaces/lr';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ValidationErrors } from '@angular/forms';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LrService {

  constructor(
    private http: HttpClient,
  ) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = environment.baseUrl + '/operations/';
  private engageLrUrl = this.url + 'lr_no/';
  private generateLrUrl = this.url + 'lr/';
  private lrUniqueCheckUrl = this.url + 'lr_unique_check/';
  private emptyLrSearchUrl = this.url + 'lr_search_empty/';

  engageLR(lr: LR): Observable<HttpResponse<LR>> {
    return this.http.post<LR>(
      this.engageLrUrl,
      lr,
      {
      headers: this.header,
      observe: 'response',
      },
    );
  }

  getLrNo(): Observable<HttpResponse<LR[]>> {
    return this.http.get<LR[]>(
      this.engageLrUrl,
      {
        headers: this.header,
        observe: 'response',
      },
    );
  }

  generateLR(genLrFormData): Observable<HttpResponse<LR>> {
    // First lets change the ewaybill_expiry_date to DD-MM-YYYY Format
    genLrFormData['ewaybill_expiry_date'] = formatDate(genLrFormData['ewaybill_expiry_date'], 'yyyy-MM-dd', 'en-IN');

    // Now lets submit the form data to the server
    return this.http.post<LR>(
      this.generateLrUrl,
      genLrFormData,
      {
      headers: this.header,
      observe: 'response',
      },
    );
  }

  lrUniqueCheck(lr_no: number): Observable<HttpResponse<ValidationErrors|boolean>> {
    return this.http
      .post<ValidationErrors|boolean>(
        this.lrUniqueCheckUrl,
        {'lr_no': lr_no},
        {
          headers: this.header,
          observe: 'response',
        },
      );
  }

  viewLr(lrNo): Observable<HttpResponse<LR>>  {
    return this.http
      .get<LR>(this.generateLrUrl + lrNo + '/',
        {
          observe: 'response',
          headers: this.header,
        },
      );
  }

  lrList(): Observable<HttpResponse<LR[]>> {
    return this.http.get<LR[]>(
      this.generateLrUrl,
      {
        headers: this.header,
        observe: 'response',
      },
    );
  }

  emptyLr(): Observable<HttpResponse<number[]>> {
    return this.http.get<number[]>(
      this.emptyLrSearchUrl,
      {
        headers: this.header,
        observe: 'response',
      },
    );
  }

}
