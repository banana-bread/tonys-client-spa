import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-staff-selection',
  templateUrl: './staff-selection.component.html',
  styleUrls: ['./staff-selection.component.scss']
})
export class StaffSelectionComponent implements OnInit {

  /*
    TODO:
    - If no staff available, display sad face and a button to go back and try again
  */

  @Input() employees: Employee[] = [];
  @Output() selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(id: string)
  {
    this.selected.emit(id);
  }

}
