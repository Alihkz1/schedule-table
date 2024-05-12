import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employee-name-cell',
  standalone: true,
  imports: [],
  templateUrl: './employee-name-cell.component.html',
  styleUrl: './employee-name-cell.component.scss'
})
export class EmployeeNameCellComponent {
  @Input() row: any;
}
