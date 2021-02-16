import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './network/api.service';
import { ServiceDefinition } from '../models/service-definition.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceDefinitionService {

  constructor(private api: ApiService) { }

  getServiceDefinitions(): Observable<any> {
    return this.api.getServiceDefinitions()
      .pipe(map((response: any) => response.data.service_definitions
        .map((service: any) => new ServiceDefinition().deserialize(service)))
    )
  }
}
