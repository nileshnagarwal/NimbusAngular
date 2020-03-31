import { Observable } from 'rxjs';
import { LR } from './../../interfaces/lr';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ValidationErrors } from '@angular/forms';

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
  private generateLrUrl = this.url + 'lr_no/';
  private lrUniqueCheckUrl = this.url + 'lr_unique_check/';

  generateLR(lr: LR): Observable<HttpResponse<LR>> {
    return this.http.post<LR>(
      this.generateLrUrl,
      lr,
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

}
