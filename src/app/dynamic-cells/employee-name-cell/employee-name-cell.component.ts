import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employee-name-cell',
  standalone: true,
  imports: [],
  templateUrl: './employee-name-cell.component.html',
  styleUrl: './employee-name-cell.component.scss'
})
export class EmployeeNameCellComponent implements OnInit {
  @Input() row: any;
  @Output() onRowEvent = new EventEmitter();

  ngOnInit(): void {
    console.log(this.row);
  }

  onRemove() {
    this.onRowEvent.emit(this.row)
  }
}
