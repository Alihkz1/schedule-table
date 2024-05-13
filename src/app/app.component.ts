import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { MOCK_DATA } from './shared/mock-data.json';
import { BehaviorSubject } from 'rxjs';
import { IHeader } from './shared/model/IHeader.interface';
import { SharedService } from './shared/service/shared.service';
import { HttpParams } from '@angular/common/http';
import { DEFAULT_END_DATE, DEFAULT_START_DATE } from './shared/constant/date.const';
import { DatePipe } from '@angular/common';
import { EmployeeNameCellComponent } from './dynamic-cells/employee-name-cell/employee-name-cell.component';
import { IRowEvent } from './shared/model/IRowEvent.interface';
import { ShiftCellComponent } from './dynamic-cells/shift-cell/shift-cell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScheduleTableComponent],
  providers: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public headers: IHeader[] = [];
  private _dataSource$ = new BehaviorSubject<any[]>([]);
  public get dataSource() { return this._dataSource$.getValue() };

  constructor(
    private sharedService: SharedService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.initHeaders();
    this.initData();
  }

  table_onRowEvent(event: IRowEvent) {
    console.log(event);
  }

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
    // this.sharedService.getWorkCalender().subscribe((data) => {
    //   this._dataSource$.next(data);
    // });
  }

  initHeaders() {
    const params = new HttpParams();
    // params.append('key', 'employeeGridSchedule');
    params.append('key', 'employeeGridSolution');
    this.sharedService.getTableConfig(params)
      .subscribe((data) => {
        // if (data) {
        //   this.headers = data.map((h: any) => {
        //     return {
        //       title: h.header,
        //       key: h.name,
        //       width: h.width
        //     }
        //   });
        // } else
        this.initDefaultHeaders();
      });

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
