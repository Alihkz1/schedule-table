import { Component } from '@angular/core';

@Component({
  selector: 'progress-bar',
  standalone: true,
  imports: [],
  template: `
      <div class="progress-bar">
           <div class="progress-bar-value">
           </div>
      </div>
  `,
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

}
