import { AfterContentInit, Component, ContentChildren, Input, QueryList, ViewChild, ViewContainerRef } from '@angular/core';
import { IHeader } from '../shared/model/IHeader.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'schedule-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.scss'
})
export class ScheduleTableComponent implements AfterContentInit {
  @ViewChild('dynamicCell', { read: ViewContainerRef }) dynamicCell: ViewContainerRef;
  @ContentChildren('eventOnCreate', { descendants: true }) templates: QueryList<any>;

  @Input() headers: IHeader[] = [];
  @Input() dataSource: any[] = [];
  @Input() rowHeight = 50;

  constructor() { }

  ngAfterContentInit(): void {
    this.templates.changes.subscribe((r) => {
      debugger
    })
  }

  loadDynamicCell(component: any) {
    this.dynamicCell?.createComponent(component);
  }

  onSortChange() { }
}
