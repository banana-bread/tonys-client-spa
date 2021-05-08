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

  async getAll(): Promise<ServiceDefinition[]> 
  {
    const response = await this.api.getServiceDefinitions();
    
    return response.data.service_definitions
      .map((service: any) => new ServiceDefinition(service));
  }
}
