import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IRowEvent } from '../../shared/model/IRowEvent.interface';
import { SOLUTION_DAYS } from '../../shared/constant/date.const';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/service/shared.service';

@Component({
  selector: 'app-shift-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shift-cell.component.html',
  styleUrl: './shift-cell.component.scss'
})
export class ShiftCellComponent implements OnInit {
  @Input() row: any;
  @Input() column: any;
  @Input() onRowEvent: EventEmitter<IRowEvent>;
  solutionDays = SOLUTION_DAYS;


  constructor(private sharedService: SharedService) { }

  ngOnInit(): void { }

  addShift() {
    this.onRowEvent.emit({
      action: 'add_shift',
      data: this.row
    })
  }
}
