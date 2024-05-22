import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IHeader } from '../../shared/model/IHeader.interface';
import { ScheduleTableService } from '../../shared/service/schedule-table.service';
import { CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'schedule-table-filter-column',
  standalone: true,
  imports: [CdkMenuModule, ReactiveFormsModule],
  templateUrl: './schedule-table-filter-column.component.html',
  styleUrl: './schedule-table-filter-column.component.scss'
})
export class ScheduleTableFilterColumnComponent {
  @Input() header: IHeader;
  @ViewChild(CdkMenuTrigger) menu: CdkMenuTrigger;

  formControl = new FormControl('');

  constructor(private tableService: ScheduleTableService) { }

  saveFilter_onClick() {
    const formValue = this.formControl.value?.toLowerCase();
    if (!formValue?.length) {
      this.menu.close();
      return;
    }
    const columnFilters = this.tableService.columnFilters;
    columnFilters[this.header.key] = formValue;
    this.tableService.setColumnFilters = columnFilters;
    this.menu.close();
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.code === 'Enter') this.saveFilter_onClick();
  }

  clearFilter_onClick() {
    this.formControl.reset();
    this.menu.close();
    const columnFilters = this.tableService.columnFilters;
    delete columnFilters[this.header.key];
    this.tableService.setColumnFilters = columnFilters;
  }
}
