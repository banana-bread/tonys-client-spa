import { TestBed } from '@angular/core/testing';

import { ServiceDefinitionService } from './service-definition.service';

describe('ServiceDefinitionService', () => {
  let service: ServiceDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
