import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ScheduleTableService {

  private _columnFilters$ = new BehaviorSubject<any>({}); /* for column filter parameters */
  public set setColumnFilters(value: any) { this._columnFilters$.next(value) }
  public get columnFilters() { return this._columnFilters$.getValue(); }
  public get columnFiltersObs(): Observable<any> { return this._columnFilters$.asObservable() }

  private _dataSource$ = new BehaviorSubject<any[]>([]) /* for filtered items */
  public get dataSource(): any[] { return this._dataSource$.getValue() }
  public set setDataSource(value: any[]) { this._dataSource$.next(value) }
  public get dataSourceObs(): Observable<any[]> { return this._dataSource$.asObservable() }

  private _realDataSource$ = new BehaviorSubject<any[]>([]) /* for all items */
  public get realDataSource(): any[] { return this._realDataSource$.getValue() }
  public set setRealDataSource(value: any[]) { this._realDataSource$.next(value) }
  public get realDataSourceObs(): Observable<any[]> { return this._realDataSource$.asObservable() }

  public get finalDataSourceAsObs(): Observable<any[]> {
    if (this.dataSource.length) return this.dataSourceObs;
    else return this.realDataSourceObs;
  }
  public get finalDataSource(): any[] {
    if (this.dataSource.length) return this.dataSource;
    else return this.realDataSource;
  }
}
