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
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290Iiwic2FsdCI6IjZlZGNlNzcxLTE4MGUtNDQ2OC04NzhkLTEyOWIzYzkzY2ZmYSIsInVzZXJuYW1lIjoicm9vdCIsInVzZXJJZCI6MzksInJvbGUiOjE2LCJ1c2VyS2luZElkIjozLCJmdWxsTmFtZSI6IkFsaSBIYWRkYWQxIiwiYWNjb3VudElkIjoxLCJhY2NvdW50TmFtZSI6IkhIQyBISCBIYXJ0Zm9yZCBIb3NwaXRhbCIsImlwIjoiMTkyLjE2OC4yLjE3MyIsIm5lZWRNZmEiOmZhbHNlLCJhcHBsaWNhdGlvbklkIjozLCJmb3JjZVRvQ2hhbmdlUGFzcyI6ZmFsc2UsInN5c3RlbSI6ImxpdmUiLCJyb2xlR3JvdXBJZCI6MSwiaWF0IjoxNzE1NDk5NjE5LCJleHAiOjE3MTU1ODU4NDF9.JpF_mXshbHj9OYPDhtsb8dPUYK-HY5q-wZchCatc7XedOje2VOBali35--OeeW5Gx22ACjJ7ltYW6lfQWAygGg'
      }
    })
      .pipe(map(({ data }: any) => JSON.parse(data.value)));
  }

  get userKindID(): number {
    return 1;
  }
}

