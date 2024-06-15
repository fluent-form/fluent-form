import { Component } from '@angular/core';
import { FluentGridModule } from '@fluent-form/core';

@Component({
  selector: 'grid-fill-example',
  standalone: true,
  imports: [FluentGridModule],
  templateUrl: './fill.component.html',
  styleUrl: '../common.scss'
})
export class GridFillExampleComponent { }
