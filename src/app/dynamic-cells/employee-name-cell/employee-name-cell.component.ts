import { Component, EventEmitter, Input } from '@angular/core';
import { IRowEvent } from '../../shared/model/IRowEvent.interface';

@Component({
  selector: 'app-employee-name-cell',
  standalone: true,
  imports: [],
  templateUrl: './employee-name-cell.component.html',
  styleUrl: './employee-name-cell.component.scss'
})
export class EmployeeNameCellComponent {
  @Input() row: any;
  @Input() onRowEvent: EventEmitter<IRowEvent>;

  onRemove() {
    this.onRowEvent.emit({
      action: 'remove_user',
      data: this.row
    })
  }
}
