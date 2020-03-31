import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../interfaces/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = environment.baseUrl + '/masters/client/';

  getClientList(): Observable<HttpResponse<Client[]>> {
    return this.http.get<Client[]>(this.url,
      {
        observe: 'response',
        headers: this.header,
      });
  }

}
