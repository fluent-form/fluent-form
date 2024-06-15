import { Component } from '@angular/core';
import { FluentGridModule } from '@fluent-form/core';

@Component({
  selector: 'grid-justify-example',
  standalone: true,
  imports: [FluentGridModule],
  templateUrl: './justify.component.html',
  styleUrl: '../common.scss'
})
export class GridJustifyExampleComponent { }
