import { Component } from '@angular/core';
import { FluentGridModule } from '@fluent-form/core';

@Component({
  selector: 'grid-basic-example',
  imports: [FluentGridModule],
  templateUrl: './basic.component.html',
  styleUrl: '../common.scss'
})
export class GridBasicExampleComponent { }
