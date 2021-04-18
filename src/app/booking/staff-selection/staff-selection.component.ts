import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-staff-selection',
  templateUrl: './staff-selection.component.html',
  styleUrls: ['./staff-selection.component.scss']
})
export class StaffSelectionComponent implements OnInit {

  @Input() employees: Employee[] = [];
  @Output() selected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(id: string)
  {
    this.selected.emit(id);
  }

}
