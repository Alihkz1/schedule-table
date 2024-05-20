import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IHeader } from '../shared/model/IHeader.interface';
import { CommonModule } from '@angular/common';
import { DynamicCellDirective } from '../shared/directive/dynamic-cell.directive';
import { IRowEvent } from '../shared/model/IRowEvent.interface';
import { ScheduleTableFilterColumnComponent } from './schedule-table-filter-column/schedule-table-filter-column.component';
import { ScheduleTableService } from '../shared/service/schedule-table.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ScheduleTableSortColumnComponent } from './schedule-table-sort-column/schedule-table-sort-column.component';
import { ShiftCellComponent } from '../dynamic-cells/shift-cell/shift-cell.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@Component({
  selector: 'schedule-table',
  standalone: true,
  imports: [
    CommonModule,
    DynamicCellDirective,
    ScheduleTableFilterColumnComponent,
    ScheduleTableSortColumnComponent,
    ShiftCellComponent,
    ScrollingModule
  ],
  providers: [ScheduleTableService],
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.scss'
})
export class ScheduleTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() headers: IHeader[] = [];
  @Input() set dataSource(data: any[]) { this.tableService.setRealDataSource = data; };
  @Input() rowHeight = 50;
  @Input() loading: boolean = false;
  @Output() onRowEvent: EventEmitter<IRowEvent> = new EventEmitter();

  private _unSubscribe$ = new Subject<void>();
  private _changedWidth$ = new Subject<number>();

  /**
  @description
  columns width resize listeners **/

  private resizing = false;
  private startWidth: number;
  private resizeColumn: any;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    if (event.target['classList'].contains('resizer')) {
      this.resizing = true;
      this.startWidth = event.clientX;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() { if (this.resizing) { this.resizing = false; } }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: any) {
    if (this.resizing) {
      const deltaX = event.clientX - this.startWidth;
      this._changedWidth$.next(deltaX / 20);
    }
  }
  
  constructor(
    private _cdr: ChangeDetectorRef,
    public tableService: ScheduleTableService
  ) { }

  ngOnInit(): void {
    this._filterColumnsListener();
    this._columnsWidthChangeListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'])
      this.tableService.setRealDataSource = changes['dataSource']['currentValue'];
  }

  ngOnDestroy(): void {
    this._unSubscribe$.next();
    this._unSubscribe$.complete();
  }

  private _filterColumnsListener() {
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
    });
  }

  private _columnsWidthChangeListener() {
    this._changedWidth$
      .pipe(
        debounceTime(2),
        takeUntil(this._unSubscribe$)
      )
      .subscribe((value) => {
        const column: any = document.getElementsByClassName('th')[this.resizeColumn.index];
        const newWidth = column.clientWidth + (value);
        column.style['min-width'] = `${newWidth}px`;
        column.style['max-width'] = `${newWidth}px`;
      })
  }

  public scroll_onChange() {
    this._cdr.detectChanges();
  }

  public resizeColumn_onMouseDown(event: any, index: number) {
    this.resizeColumn = {
      clientX: event.clientX,
      index,
    }
  }
}
