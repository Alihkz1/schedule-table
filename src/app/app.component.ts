import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { MOCK_DATA } from './shared/mock-data.json';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IHeader } from './shared/model/IHeader.interface';
import { SharedService } from './shared/service/shared.service';
import { DEFAULT_END_DATE, DEFAULT_START_DATE } from './shared/constant/date.const';
import { CommonModule, DatePipe } from '@angular/common';
import { EmployeeNameCellComponent } from './dynamic-cells/employee-name-cell/employee-name-cell.component';
import { IRowEvent } from './shared/model/IRowEvent.interface';
import { ShiftCellComponent } from './dynamic-cells/shift-cell/shift-cell.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';

export enum PROGRAMMED_TABLE_ENUM {
  SHIFT = 0,
  BLOCK = 1,
  HORUS = 2,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ScheduleTableComponent,
    CdkAccordionModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule
  ],
  providers: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('drawer', { static: false }) drawer: any;

  public positions: any[] = [];
  public blocks: any[] = [];

  public headers: IHeader[] = [];
  private _programmedHeaders$ = new BehaviorSubject<any[]>([]);
  public get programmedHeaders(): IHeader[] { return this._programmedHeaders$.getValue() }

  expanded = true;
  dataLoading: Subscription;
  mockDataLoading: boolean;
  programmedLoading: boolean;

  selectedToggle = 1;
  positionsFormControl = new FormControl();

  private _toggle$ = new BehaviorSubject<PROGRAMMED_TABLE_ENUM>(PROGRAMMED_TABLE_ENUM.BLOCK);

  private _dataSource$ = new BehaviorSubject<any[]>([]);
  public get dataSource() { return this._dataSource$.getValue() };
  private _programmedDataSource$ = new BehaviorSubject<any[]>([]);
  public get programmedDataSource() { return this._programmedDataSource$.getValue() };

  private resizing = false;
  public topDivInitialHeight = 600;
  public bottomDivInitialHeight = 400;
  private startResizeHeight: number;

  constructor(
    private datePipe: DatePipe,
    private sharedService: SharedService,
  ) { }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    if (event.target['classList'].contains('resize')) {
      this.resizing = true;
      this.startResizeHeight = event.clientY;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    if (this.resizing) {
      this.resizing = false;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.resizing) {
      const deltaY = event.clientY - this.startResizeHeight;
      this.topDivInitialHeight += deltaY;
      this.bottomDivInitialHeight -= deltaY;
      this.startResizeHeight = event.clientY;
    }
  }

  public resize_onEvent(event: MouseEvent) {
    if (this.resizing) {
      const deltaY = event.clientY - this.startResizeHeight;
      this.topDivInitialHeight += deltaY;
      this.bottomDivInitialHeight -= deltaY;
      this.startResizeHeight = event.clientY;
    }
  }

  ngOnInit(): void {
    this.initHeaders();
    this.initData();
    this.getPositions();
    this.toggleChange();
  }

  toggleChange() {
    this._toggle$.subscribe((index: PROGRAMMED_TABLE_ENUM) => {
      let headers: IHeader[] = [];
      switch (index) {
        case PROGRAMMED_TABLE_ENUM.SHIFT:
          this.getShifts({ PositionList: JSON.stringify(this.positionsFormControl.value) });
          headers = [
            {
              key: 'Date',
              title: 'Date'
            }
          ]
          break;
        case PROGRAMMED_TABLE_ENUM.BLOCK:
          this.getBlocks({ PositionList: JSON.stringify(this.positionsFormControl.value) });
          headers = [
            {
              key: 'BlockName',
              title: 'Block Name',
            },
          ]
          break;
        case PROGRAMMED_TABLE_ENUM.HORUS:
          this.getIntervals({ PositionList: JSON.stringify(this.positionsFormControl.value) });
          headers = [
            {
              key: 'intervalName',
              title: 'Interval Name'
            }
          ]
          break;
      }
      this._programmedHeaders$.next(headers)
    })
  }

  getPositions() {
    this.sharedService.getPositions().subscribe((list: any[]) => {
      this.positions = list
    })
  }

  getBlocks(model: any) {
    this.sharedService.getBlocks(model).subscribe((list: any[]) => {
      this._programmedDataSource$.next(list);
    })
  }

  getShifts(model: any) {
    this.sharedService.getShifts(model).subscribe((list: any[]) => {
      this._programmedDataSource$.next(list);
    })
  }

  getIntervals(model: any) {
    this.sharedService.getIntervals(model).subscribe((list: any[]) => {
      this._programmedDataSource$.next(list);
    })
  }

  table_onRowEvent(event: IRowEvent) {
    console.log(event);
    this.drawer.toggle();
  }

  toggle_onClick(index: PROGRAMMED_TABLE_ENUM) {
    this.selectedToggle = index;
    this._toggle$.next(index);
  }

  apply_onClick() { }

  available_onClick() { }

  initData() {
    const ds = MOCK_DATA.map((el: any, i: number) => {
      return {
        ...el,
        i: i + 1,
        Schedule: JSON.parse(el.Schedule).map((s: any) => {
          return {
            ...s,
            blockList: s.blockList ? JSON.parse(s.blockList) : []
          }
        })
      }
    });
    this._dataSource$.next(ds);
    this.mockDataLoading = true;
    this.dataLoading = this.sharedService.getWorkCalender().subscribe((data) => {
      this.mockDataLoading = false;
      this._dataSource$.next(data);
    });
  }

  initHeaders() {
    this.initDefaultHeaders();
  }

  initDefaultHeaders() {
    this.headers = [
      {
        title: '#',
        key: 'i',
        sortable: true,
        width: 20
      },
      {
        title: 'RN Name',
        key: 'FullName',
        dynamicCellComponent: EmployeeNameCellComponent,
        filterable: true,
        sortable: true,
        width: 250,
      },
      {
        title: 'Trainee',
        key: 'EligibilityToBeTrainee',
        filterable: true,
        sortable: true,
        width: 150
      },
      {
        title: 'RN Tier',
        key: 'RnTierTitle',
        filterable: true,
        sortable: true,
        width: 250
      },
    ];
    const dates = [];
    let startDay = new Date(DEFAULT_START_DATE);
    let endDay = new Date(DEFAULT_END_DATE);
    while (startDay < endDay) {
      dates.push(this.datePipe.transform(startDay, 'EEE MM/dd/yyyy'));
      startDay = new Date(
        startDay.getFullYear(),
        startDay.getMonth(),
        startDay.getDate() + 1,
        0,
        0,
        0
      );
    }
    dates.forEach((el, i) => {
      this.headers.push({
        key: 'day' + (i + 1),
        title: el ?? '',
        sortable: true,
        width: 250,
        dynamicCellComponent: ShiftCellComponent
      });
    })
  }
}
