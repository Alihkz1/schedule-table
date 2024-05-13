import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { IHeader } from '../../shared/model/IHeader.interface';
import { ScheduleTableService } from '../../shared/service/schedule-table.service';

@Component({
  selector: 'schedule-table-filter-column',
  standalone: true,
  imports: [NgbModule, ReactiveFormsModule],
  templateUrl: './schedule-table-filter-column.component.html',
  styleUrl: './schedule-table-filter-column.component.scss'
})
export class ScheduleTableFilterColumnComponent {
  @Input() header: IHeader;
  @ViewChild('popover') popover: NgbPopover;

  formControl = new FormControl('');

  constructor(private tableService: ScheduleTableService) { }

  saveFilter_onClick(headerKey: string) {
    const formValue = this.formControl.value?.toLowerCase();
    if (!formValue?.length) return;
    this.tableService.setDataSource = this.tableService.dataSource
    .filter((el) => el[headerKey].toLowerCase().includes(formValue));
    this.popover.close();
  }

  handleKeyPress(event: KeyboardEvent, headerKey: string) {
    if (event.code === 'Enter') this.saveFilter_onClick(headerKey);
  }

  clearFilter_onClick() {
    this.formControl.reset();
    this.popover.close();
    this.tableService.setDataSource = [];
  }
}
