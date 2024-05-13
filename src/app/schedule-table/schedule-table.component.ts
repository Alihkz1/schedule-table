import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IHeader } from '../shared/model/IHeader.interface';
import { CommonModule } from '@angular/common';
import { DynamicCellDirective } from '../shared/directive/dynamic-cell.directive';
import { IRowEvent } from '../shared/model/IRowEvent.interface';
import { ScheduleTableFilterColumnComponent } from './schedule-table-filter-column/schedule-table-filter-column.component';
import { ScheduleTableService } from '../shared/service/schedule-table.service';
import { Subject, takeUntil } from 'rxjs';
import { ScheduleTableSortColumnComponent } from './schedule-table-sort-column/schedule-table-sort-column.component';
import { ShiftCellComponent } from '../dynamic-cells/shift-cell/shift-cell.component';


@Component({
  selector: 'schedule-table',
  standalone: true,
  imports: [
    CommonModule,
    DynamicCellDirective,
    ScheduleTableFilterColumnComponent,
    ScheduleTableSortColumnComponent,
    ShiftCellComponent
  ],
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.scss'
})
export class ScheduleTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() headers: IHeader[] = [];
  @Input() set dataSource(data: any[]) {
    this.tableService.setRealDataSource = data;
  }
  @Input() rowHeight = 50;
  @Input() loading: boolean = false;
  @Output() onRowEvent: EventEmitter<IRowEvent> = new EventEmitter();

  private _unSubscribe$ = new Subject<void>();

  constructor(public tableService: ScheduleTableService) { }

  ngOnInit(): void {
    this.tableService.columnFiltersObs.pipe(takeUntil(this._unSubscribe$)).subscribe((result) => {
      if (!Object.keys(result).length) {
        this.tableService.setDataSource = [];
        return;
      }
      let items: any[] = [];
      Object.keys(result).forEach((key, i) => {
        if (i === 0)
          items = this.tableService.realDataSource.filter((el) => el[key]?.toLowerCase().includes(result[key]));
        else if (i > 0)
          items = items.filter((el) => el[key].toLowerCase().includes(result[key]));
      });
      this.tableService.setDataSource = items;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'])
      this.tableService.setRealDataSource = changes['dataSource']['currentValue'];
  }

  ngOnDestroy(): void {
    this._unSubscribe$.next();
    this._unSubscribe$.complete();
  }
}
