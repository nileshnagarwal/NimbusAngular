import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enquiry } from '../../interfaces/enquiry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MiscService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;

  getResUrl(url): Observable<HttpResponse<Enquiry[]>> {
    return this.http.get<Enquiry[]>(url,
      {
        headers: this.header,
        observe: 'response',
      });
  }
}
