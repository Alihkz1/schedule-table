import { Component, Input } from '@angular/core';
import { IHeader } from '../../shared/model/IHeader.interface';
import { CommonModule } from '@angular/common';
import { ScheduleTableService } from '../../shared/service/schedule-table.service';

export enum SORT_ENUM {
  ASC = 0,
  DESC = 1,
}

@Component({
  selector: 'schedule-table-sort-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-table-sort-column.component.html',
  styleUrl: './schedule-table-sort-column.component.scss'
})
export class ScheduleTableSortColumnComponent {
  @Input() header: IHeader;

  constructor(private tableService: ScheduleTableService) { }

  sortChange_onClick(mode: SORT_ENUM) {
    this.tableService.setRealDataSource = this.tableService.finalDataSource.sort((a, b) => {
      if (typeof a[this.header.key] === 'number') {
        if (mode === SORT_ENUM.ASC) return a[this.header.key] - b[this.header.key];
        else return b[this.header.key] - a[this.header.key];
      } else if (typeof a[this.header.key] === 'string') {
        if (mode === SORT_ENUM.ASC) return a[this.header.key].length - b[this.header.key].length;
        else return b[this.header.key].length - a[this.header.key].length;
      } else return 0
    });
  }

}
