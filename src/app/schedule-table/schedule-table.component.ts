import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IHeader } from '../shared/model/IHeader.interface';
import { CommonModule } from '@angular/common';
import { DynamicCellDirective } from '../shared/directive/dynamic-cell.directive';
import { IRowEvent } from '../shared/model/IRowEvent.interface';


@Component({
  selector: 'schedule-table',
  standalone: true,
  imports: [CommonModule, DynamicCellDirective],
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.scss'
})
export class ScheduleTableComponent {
  @Input() headers: IHeader[] = [];
  @Input() dataSource: any[] = [];
  @Input() rowHeight = 50;
  @Output() onRowEvent: EventEmitter<IRowEvent> = new EventEmitter();

  onSortChange() { }
}
