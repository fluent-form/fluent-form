import { Component } from '@angular/core';
import { FluentGridModule } from '@fluent-form/core';

@Component({
  selector: 'grid-offset-example',
  standalone: true,
  imports: [FluentGridModule],
  templateUrl: './offset.component.html',
  styleUrl: '../common.scss'
})
export class GridOffsetExampleComponent { }
