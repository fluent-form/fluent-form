import { Component } from '@angular/core';
import { FluentGridModule } from '@fluent-form/core';

@Component({
  selector: 'grid-align-example',
  standalone: true,
  imports: [FluentGridModule],
  templateUrl: './align.component.html',
  styleUrl: '../common.scss'
})
export class GridAlignExampleComponent { }
