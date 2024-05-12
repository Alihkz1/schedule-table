import { Component, Input } from '@angular/core';
import { IHeader } from '../shared/model/IHeader.interface';
import { CommonModule } from '@angular/common';
import { DynamicCellDirective } from '../shared/directive/dynamic-cell.directive';


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

  onSortChange() { }
}
