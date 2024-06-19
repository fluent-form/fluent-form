import { Component } from '@angular/core';
import { FluentGridModule } from '@fluent-form/core';

@Component({
  selector: 'grid-flex-example',
  standalone: true,
  imports: [FluentGridModule],
  templateUrl: './flex.component.html',
  styleUrl: '../common.scss'
})
export class GridFlexExampleComponent { }
