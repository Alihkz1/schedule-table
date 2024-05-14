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
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290Iiwic2FsdCI6Ijc1YzAxMzc1LTk5NTktNDU2My1iNDU3LWQ2MGFlM2Y5ZmUzMSIsInVzZXJuYW1lIjoicm9vdCIsInVzZXJJZCI6MzksInJvbGUiOjE2LCJ1c2VyS2luZElkIjozLCJmdWxsTmFtZSI6IkFsaSBIYWRkYWQxIiwiYWNjb3VudElkIjoxLCJhY2NvdW50TmFtZSI6IkhIQyBISCBIYXJ0Zm9yZCBIb3NwaXRhbCIsImlwIjoiMTkyLjE2OC4yLjE3MyIsIm5lZWRNZmEiOmZhbHNlLCJhcHBsaWNhdGlvbklkIjozLCJmb3JjZVRvQ2hhbmdlUGFzcyI6ZmFsc2UsInN5c3RlbSI6ImxpdmUiLCJyb2xlR3JvdXBJZCI6MSwiaWF0IjoxNzE1NjY3MTQ2LCJleHAiOjE3MTU3NTM1MDJ9.F2OhEk_WHnZp67hz1-wt6e16VK0HlMXSWk7v40hHyWgdMUNPVp5qcWAlXP1BgCDNynZEOpqGLDgpm0ZQzVLQfA'
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
}

