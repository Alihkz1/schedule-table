import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IHeader } from '../shared/model/IHeader.interface';
import { CommonModule } from '@angular/common';
import { DynamicCellDirective } from '../shared/directive/dynamic-cell.directive';
import { IRowEvent } from '../shared/model/IRowEvent.interface';
import { ScheduleTableFilterColumnComponent } from './schedule-table-filter-column/schedule-table-filter-column.component';
import { ScheduleTableService } from '../shared/service/schedule-table.service';


@Component({
  selector: 'schedule-table',
  standalone: true,
  imports: [CommonModule, DynamicCellDirective, ScheduleTableFilterColumnComponent],
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.scss'
})
export class ScheduleTableComponent implements OnInit, OnChanges {
  @Input() headers: IHeader[] = [];
  @Input() set dataSource(data: any[]) {
    this.tableService.setRealDataSource = data;
  }
  @Input() rowHeight = 50;
  @Output() onRowEvent: EventEmitter<IRowEvent> = new EventEmitter();

  constructor(public tableService: ScheduleTableService) { }

  sortChange_onClick() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'])
      this.tableService.setRealDataSource = changes['dataSource']['currentValue'];
  }

  ngOnInit(): void { }
}
