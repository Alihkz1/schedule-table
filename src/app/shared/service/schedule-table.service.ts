import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleTableService {
  private _dataSource$ = new BehaviorSubject<any[]>([]) /* for filtered items */
  private _realDataSource$ = new BehaviorSubject<any[]>([]) /* for all items */

  public get dataSource(): any[] {
    if (this._dataSource$.getValue().length) return this._dataSource$.getValue()
    else return this._realDataSource$.getValue()
  }

  public get dataSourceObs(): Observable<any[]> { return this._dataSource$.asObservable() }
  public get realDataSourceObs(): Observable<any[]> { return this._realDataSource$.asObservable() }

  public set setDataSource(value: any[]) { this._dataSource$.next(value) }
  public set setRealDataSource(value: any[]) { this._realDataSource$.next(value) }
}
