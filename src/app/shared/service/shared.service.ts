import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export const ONSITE_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290Iiwic2FsdCI6IjE2MTJkZDEzLTkxMmYtNGRiMS1iZmFjLTQ4OWNiODM5OTM4YiIsInVzZXJuYW1lIjoicm9vdCIsInVzZXJJZCI6MzksInJvbGUiOjE2LCJ1c2VyS2luZElkIjozLCJmdWxsTmFtZSI6IkFsaSBIYWRkYWQxIiwiYWNjb3VudElkIjo2LCJhY2NvdW50TmFtZSI6IkhIQyBTViBTdC4gVmluY2VudCdzIE1lZGljYWwgQ2VudGVyIiwiaXAiOiIxOTIuMTY4LjIuMTczIiwibmVlZE1mYSI6ZmFsc2UsImFwcGxpY2F0aW9uSWQiOjEsImZvcmNlVG9DaGFuZ2VQYXNzIjpmYWxzZSwibWV0YURhdGEiOnt9LCJzeXN0ZW0iOiJsaXZlIiwicm9sZUdyb3VwSWQiOjM1LCJpYXQiOjE3MTYxMDE1MjQsImV4cCI6MTcxNjE4NzkyNH0.MtcJbqf1CTx9EM1nknXT5fb9oba5d-IcPb80BdgPfO9NYhRZ_YsYrKkIRMjZVYS0zroKGUbUX3x_ashyb0ShHw';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  get userKindID(): number { return 1; }

  constructor(private http: HttpClient) { }


  getTableConfig(params: HttpParams) {
    return this.http.get('http://192.168.2.200:5013/EDNurses/v1/config?key=employeeGridSchedule', {
      params,
      headers: {
        Authorization: ONSITE_TOKEN
      }
    })
      .pipe(map(({ data }: any) => JSON.parse(data.value)));
  }



  getWorkCalender() {
    return this.http.get('http://192.168.2.63:5013/EDNurses/v1/WorkCalendar/Search?PageSize=10000&PageIndex=0&StartDate=2024-04-28&EndDate=2024-06-01', {
      headers: {
        Authorization: ONSITE_TOKEN
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
        Authorization: ONSITE_TOKEN
      }
    })
      .pipe(
        map((({ data }: any) => {
          return data.PositionList;
        }))
      );
  }

  getBlocks(model: any) {
    return this.http.get(`http://192.168.2.63:5013/EDNurses/v1/Block/List?PositionList=${model.PositionList}`, {
      headers: {
        Authorization: ONSITE_TOKEN
      }
    })
      .pipe(
        map((({ data }: any) => {
          return data.BlockList;
        }))
      );
  }

  getShifts(model: any) {
    return this.http.get(`http://192.168.2.63:5013/EDNurses/v1/Shift/Schedule?SolutionID=341&startDate=2024-04-28&endDate=2024-06-01&PositionList=${model.PositionList}`, {
      headers: {
        Authorization: ONSITE_TOKEN
      }
    })
      .pipe(
        map((({ data }: any) => {
          return data.PlannedShift;
        }))
      );
  }

  getIntervals(model: any) {
    return this.http.get(`http://192.168.2.63:5013/EDNurses/v1/schedule/scheduled-intervals?SolutionID=341&startDate=2024-05-12&endDate=2024-05-18&PositionList=${model.PositionList}`, {
      headers: {
        Authorization: ONSITE_TOKEN
      }
    })
      .pipe(
        map((({ data }: any) => {
          return data.StaffCountIntervals;
        }))
      );
  }
}

