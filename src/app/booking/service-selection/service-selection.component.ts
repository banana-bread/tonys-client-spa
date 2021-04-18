import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceDefinition } from 'src/app/models/service-definition.model';

@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.scss']
})
export class ServiceSelectionComponent implements OnInit {

  @Input() serviceDefinitions: ServiceDefinition[];
  @Output() selected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(service: ServiceDefinition)
  {
    service.selected = !service.selected;
    this.selected.emit(null);
  }

  toggleChecked(service: ServiceDefinition)
  {
  }

}
