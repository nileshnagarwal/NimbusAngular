import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../interfaces/client';
import { ClientAddress } from '../../interfaces/client-address';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = environment.baseUrl + '/masters/client/';
  private clientAddressUrl = environment.baseUrl + '/masters/client_adr/';
  private clientAddressByClientIdUrl = environment.baseUrl +
    '/masters/client_adr_by_client_id/';

  getClientList(): Observable<HttpResponse<Client[]>> {
    return this.http.get<Client[]>(this.url,
      {
        headers: this.header,
        observe: 'response',
      });
  }

  getClientAddress(): Observable<HttpResponse<ClientAddress[]>> {
    return this.http.get<ClientAddress[]>(
      this.clientAddressUrl,
      {
        headers: this.header,
        observe: 'response',
      },
    );
  }

  getClientAddressByClientId(client_id): Observable<HttpResponse<ClientAddress[]>> {
    return this.http.get<ClientAddress[]>(
      this.clientAddressByClientIdUrl,
      {
        params: {
          client_id: client_id,
        },
        headers: this.header,
        observe: 'response',
      },
    );
  }

}
