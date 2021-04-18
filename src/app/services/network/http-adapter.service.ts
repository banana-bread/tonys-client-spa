import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';

type httpMethods = 'GET'|'POST'|'PUT'|'PATCH'|'DELETE';

@Injectable({
  providedIn: 'root'
})
export class HttpAdapter {
  API_URL: string = 'http://localhost:89'
  _path: string = '';
  _method: string = '';
  _queries: string = '';
  _params: string[] = [];
  _data: {} = {};
  _headers: [] = []; 

  constructor(private _http: HttpClient) {}

  path(path: string): this 
  {
    this._path = path;

    return this;
  }

  query(key: string, value: string | String[]): this 
  {
    value = typeof value === 'string'
      ? value
      : value.join(','); 

    this._queries = !!this._queries
      ? this._queries = `${this._queries}&${key}=${value}`
      : this._queries = `?${key}=${value}`;

    return this;
  }

  param(key: string, value: string | number): this 
  {
    if (! this._path.includes(`{${key}}`))
    {
      console.error('fix!')
      // throwError('error finding path parameter')
    }

    this._path.replace(`{${key}}`, key);

    return this;
  }

  data(data: {}): this 
  {
    this._data = {...this._data, ...data}

    return this;
  }

  get(): Promise<any> 
  {
    return this.sendRequest('GET');
  }

  post(): Promise<any> 
  {
    return this.sendRequest('POST');
  }

  put(): Promise<any> 
  {
    return this.sendRequest('PUT');
  }

  patch(): Promise<any> 
  { 
    return this.sendRequest('PATCH');
  }

  delete(): Promise<any> 
  {
    return this.sendRequest('DELETE');
  }

  private generateUrl(): string 
  {
    return `${this.API_URL}${this._path}${this._queries}`;
  }

  private sendRequest(method: httpMethods): Promise<any> 
  {
    return this._http.request(method, this.generateUrl(), {
      body: this._data
    }).toPromise();
  }
}
