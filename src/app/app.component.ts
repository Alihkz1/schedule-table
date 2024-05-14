import { Component, HostListener, OnInit } from '@angular/core';
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

export enum SECOND_TABLE_ENUM {
  SHIFT = 0,
  BLOCK = 1,
  HORUS = 2,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleTableComponent, CdkAccordionModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public headers: IHeader[] = [];
  public positions: any[] = [];
  expanded = true;
  dataLoading: Subscription;
  mockDataLoading: boolean;
  positionsFormControl = new FormControl();
  private _dataSource$ = new BehaviorSubject<any[]>([]);
  public get dataSource() { return this._dataSource$.getValue() };

  public topDivInitialHeight = 900;
  public bottomDivInitialHeight = 100;
  private resizing = false;
  private startResizeHeight: number;

  constructor(
    private sharedService: SharedService,
    private datePipe: DatePipe,
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
  }

  getPositions() {
    this.sharedService.getPositions().subscribe((list: any[]) => {
      console.log(list);

      this.positions = list
    })
  }

  table_onRowEvent(event: IRowEvent) {
    console.log(event);
  }

  toggle_onClick(index: SECOND_TABLE_ENUM) {
    console.log(index);
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
    // this.dataLoading = this.sharedService.getWorkCalender().subscribe((data) => {
    //   this._dataSource$.next(data);
    // });
  }

  initHeaders() {
    // const params = new HttpParams();
    // params.append('key', 'employeeGridSchedule');
    // params.append('key', 'employeeGridSolution');
    // this.sharedService.getTableConfig(params)
    //   .subscribe((data) => {
    // if (data) {
    //   this.headers = data.map((h: any) => {
    //     return {
    //       title: h.header,
    //       key: h.name,
    //       width: h.width
    //     }
    //   });
    // } else
    // });
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
