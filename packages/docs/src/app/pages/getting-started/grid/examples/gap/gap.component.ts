import { Component } from '@angular/core';
import { FluentGridModule } from '@fluent-form/core';

@Component({
  selector: 'grid-gap-example',
  standalone: true,
  imports: [FluentGridModule],
  templateUrl: './gap.component.html',
  styleUrl: '../common.scss'
})
export class GridGapExampleComponent { }
