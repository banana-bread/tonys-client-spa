import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type httpMethods = 'GET'|'POST'|'PUT'|'PATCH'|'DELETE';

@Injectable({
  providedIn: 'root'
})
export class HttpAdapter {
  API_URL: string = 'http://localhost:89'
  _path: string = '';
  _method: string = '';
  _queries: string = '';
  _data: {} = {};
  _headers: [] = []; 

  constructor(private _http: HttpClient) {}

  path(path: string): this {
    this._path = path;

    return this;
  }

  query(key: string, value: string | String[]): this {
    value = typeof value === 'string'
      ? value
      : value.join(','); 

    this._queries = !!this._queries
      ? this._queries = `${this._queries}&${key}=${value}`
      : this._queries = `?${key}=${value}`;

    return this;
  }

  data(data: {}): this {
    this._data = {...this._data, ...data}

    return this;
  }

  get(): Observable<any> {
    return this.sendRequest('GET');
  }

  post(): Observable<any> {
    return this.sendRequest('POST');
  }

  put(): Observable<any> {
    return this.sendRequest('PUT');
  }

  patch(): Observable<any> { 
    return this.sendRequest('PATCH');
  }

  delete(): Observable<any> {
    return this.sendRequest('DELETE');
  }

  private generateUrl(): string {
    return `${this.API_URL}${this._path}${this._queries}`;
  }

  private sendRequest(method: httpMethods): Observable<any> {
    return this._http.request(method, this.generateUrl(), {
      body: this._data
    });
  }
}
