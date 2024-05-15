import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  constructor(private http: HttpClient) { }


  getTableConfig(params: HttpParams) {
    return this.http.get('http://192.168.2.200:5013/EDNurses/v1/config?key=employeeGridSchedule', {
      params,
      headers: {
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290Iiwic2FsdCI6ImUwYjI4ZWY5LTc1Y2QtNGFmMy04MGI0LTlhYWFkZTlmZDAwOSIsInVzZXJuYW1lIjoicm9vdCIsInVzZXJJZCI6MzksInJvbGUiOjE2LCJ1c2VyS2luZElkIjozLCJmdWxsTmFtZSI6IkFsaSBIYWRkYWQxIiwiYWNjb3VudElkIjoxLCJhY2NvdW50TmFtZSI6IkhIQyBISCBIYXJ0Zm9yZCBIb3NwaXRhbCIsImlwIjoiMTkyLjE2OC4yLjE3MyIsIm5lZWRNZmEiOmZhbHNlLCJhcHBsaWNhdGlvbklkIjoxNSwiZm9yY2VUb0NoYW5nZVBhc3MiOmZhbHNlLCJzeXN0ZW0iOiJsaXZlIiwicm9sZUdyb3VwSWQiOjEsImlhdCI6MTcxNTUzMTIyNSwiZXhwIjoxNzE1NjE3NjIyfQ.KMd-KtoMWXvWKdBZflIk1GV1BxoL5U4Qg0lRn-mY5Ciz93r82msLhqlByaxkbnIemKMaGZSWv2wyWksu-HK6hg'
      }
    })
      .pipe(map(({ data }: any) => JSON.parse(data.value)));
  }

  get userKindID(): number {
    return 1;
  }


  getWorkCalender() {
    return this.http.get('http://192.168.2.63:5013/EDNurses/v1/WorkCalendar/Search?PageSize=10000&PageIndex=0&StartDate=2024-04-28&EndDate=2024-06-01', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290Iiwic2FsdCI6IjM4Y2RhNGY3LTE0NDUtNDQ3Ny1hYmZhLTY5NTg4NzkwNzQ3ZiIsInVzZXJuYW1lIjoicm9vdCIsInVzZXJJZCI6MzksInJvbGUiOjE2LCJ1c2VyS2luZElkIjozLCJmdWxsTmFtZSI6IkFsaSBIYWRkYWQxIiwiYWNjb3VudElkIjo2LCJhY2NvdW50TmFtZSI6IkhIQyBTViBTdC4gVmluY2VudCdzIE1lZGljYWwgQ2VudGVyIiwiaXAiOiIxOTIuMTY4LjIuMTczIiwibmVlZE1mYSI6ZmFsc2UsImFwcGxpY2F0aW9uSWQiOjEsImZvcmNlVG9DaGFuZ2VQYXNzIjpmYWxzZSwibWV0YURhdGEiOnt9LCJzeXN0ZW0iOiJsaXZlIiwicm9sZUdyb3VwSWQiOjM1LCJpYXQiOjE3MTU3NzcyNTIsImV4cCI6MTcxNTg2MzY1Mn0.fFGTb4f0hEaRftHFy5SX6FoiXgYdaMpaLcDDoYBvr4feGWY2okUNpckS2JJZfl7nuUSgz6KcH5E2BR6T03RpJw'
      }
    })
      .pipe(
        map((({ data }: any) => {
          return data.WorkCalendar.map((el: any, i: number) => {
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
        }))
      );
  }

  getPositions() {
    return this.http.get('http://192.168.2.63:5013/EDNurses/v1/Position/List', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290Iiwic2FsdCI6IjM4Y2RhNGY3LTE0NDUtNDQ3Ny1hYmZhLTY5NTg4NzkwNzQ3ZiIsInVzZXJuYW1lIjoicm9vdCIsInVzZXJJZCI6MzksInJvbGUiOjE2LCJ1c2VyS2luZElkIjozLCJmdWxsTmFtZSI6IkFsaSBIYWRkYWQxIiwiYWNjb3VudElkIjo2LCJhY2NvdW50TmFtZSI6IkhIQyBTViBTdC4gVmluY2VudCdzIE1lZGljYWwgQ2VudGVyIiwiaXAiOiIxOTIuMTY4LjIuMTczIiwibmVlZE1mYSI6ZmFsc2UsImFwcGxpY2F0aW9uSWQiOjEsImZvcmNlVG9DaGFuZ2VQYXNzIjpmYWxzZSwibWV0YURhdGEiOnt9LCJzeXN0ZW0iOiJsaXZlIiwicm9sZUdyb3VwSWQiOjM1LCJpYXQiOjE3MTU3NzcyNTIsImV4cCI6MTcxNTg2MzY1Mn0.fFGTb4f0hEaRftHFy5SX6FoiXgYdaMpaLcDDoYBvr4feGWY2okUNpckS2JJZfl7nuUSgz6KcH5E2BR6T03RpJw'
      }
    })
      .pipe(
        map((({ data }: any) => {
          return data.PositionList;
        }))
      );
  }

  getBlocks() {
    return this.http.get('http://192.168.2.63:5013/EDNurses/v1/Block/List', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290Iiwic2FsdCI6IjM4Y2RhNGY3LTE0NDUtNDQ3Ny1hYmZhLTY5NTg4NzkwNzQ3ZiIsInVzZXJuYW1lIjoicm9vdCIsInVzZXJJZCI6MzksInJvbGUiOjE2LCJ1c2VyS2luZElkIjozLCJmdWxsTmFtZSI6IkFsaSBIYWRkYWQxIiwiYWNjb3VudElkIjo2LCJhY2NvdW50TmFtZSI6IkhIQyBTViBTdC4gVmluY2VudCdzIE1lZGljYWwgQ2VudGVyIiwiaXAiOiIxOTIuMTY4LjIuMTczIiwibmVlZE1mYSI6ZmFsc2UsImFwcGxpY2F0aW9uSWQiOjEsImZvcmNlVG9DaGFuZ2VQYXNzIjpmYWxzZSwibWV0YURhdGEiOnt9LCJzeXN0ZW0iOiJsaXZlIiwicm9sZUdyb3VwSWQiOjM1LCJpYXQiOjE3MTU3NzcyNTIsImV4cCI6MTcxNTg2MzY1Mn0.fFGTb4f0hEaRftHFy5SX6FoiXgYdaMpaLcDDoYBvr4feGWY2okUNpckS2JJZfl7nuUSgz6KcH5E2BR6T03RpJw'
      }
    })
      .pipe(
        map((({ data }: any) => {
          return data.BlockList;
        }))
      );
  }

  getShifts() {
    return this.http.get('http://192.168.2.63:5013/EDNurses/v1/Shift/Schedule?SolutionID=341&startDate=2024-04-28&endDate=2024-06-01', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290Iiwic2FsdCI6IjM4Y2RhNGY3LTE0NDUtNDQ3Ny1hYmZhLTY5NTg4NzkwNzQ3ZiIsInVzZXJuYW1lIjoicm9vdCIsInVzZXJJZCI6MzksInJvbGUiOjE2LCJ1c2VyS2luZElkIjozLCJmdWxsTmFtZSI6IkFsaSBIYWRkYWQxIiwiYWNjb3VudElkIjo2LCJhY2NvdW50TmFtZSI6IkhIQyBTViBTdC4gVmluY2VudCdzIE1lZGljYWwgQ2VudGVyIiwiaXAiOiIxOTIuMTY4LjIuMTczIiwibmVlZE1mYSI6ZmFsc2UsImFwcGxpY2F0aW9uSWQiOjEsImZvcmNlVG9DaGFuZ2VQYXNzIjpmYWxzZSwibWV0YURhdGEiOnt9LCJzeXN0ZW0iOiJsaXZlIiwicm9sZUdyb3VwSWQiOjM1LCJpYXQiOjE3MTU3NzcyNTIsImV4cCI6MTcxNTg2MzY1Mn0.fFGTb4f0hEaRftHFy5SX6FoiXgYdaMpaLcDDoYBvr4feGWY2okUNpckS2JJZfl7nuUSgz6KcH5E2BR6T03RpJw'
      }
    })
      .pipe(
        map((({ data }: any) => {
          return data.PlannedShift;
        }))
      );
  }

  getIntervals() {
    return this.http.get('http://192.168.2.63:5013/EDNurses/v1/schedule/scheduled-intervals?SolutionID=341&startDate=2024-05-12&endDate=2024-05-18', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290Iiwic2FsdCI6IjM4Y2RhNGY3LTE0NDUtNDQ3Ny1hYmZhLTY5NTg4NzkwNzQ3ZiIsInVzZXJuYW1lIjoicm9vdCIsInVzZXJJZCI6MzksInJvbGUiOjE2LCJ1c2VyS2luZElkIjozLCJmdWxsTmFtZSI6IkFsaSBIYWRkYWQxIiwiYWNjb3VudElkIjo2LCJhY2NvdW50TmFtZSI6IkhIQyBTViBTdC4gVmluY2VudCdzIE1lZGljYWwgQ2VudGVyIiwiaXAiOiIxOTIuMTY4LjIuMTczIiwibmVlZE1mYSI6ZmFsc2UsImFwcGxpY2F0aW9uSWQiOjEsImZvcmNlVG9DaGFuZ2VQYXNzIjpmYWxzZSwibWV0YURhdGEiOnt9LCJzeXN0ZW0iOiJsaXZlIiwicm9sZUdyb3VwSWQiOjM1LCJpYXQiOjE3MTU3NzcyNTIsImV4cCI6MTcxNTg2MzY1Mn0.fFGTb4f0hEaRftHFy5SX6FoiXgYdaMpaLcDDoYBvr4feGWY2okUNpckS2JJZfl7nuUSgz6KcH5E2BR6T03RpJw'
      }
    })
      .pipe(
        map((({ data }: any) => {
          return data.StaffCountIntervals;
        }))
      );
  }
}

