import { Component } from '@angular/core';
import { FluentGridModule } from '@fluent-form/core';

@Component({
  selector: 'grid-responsive-example',
  standalone: true,
  imports: [FluentGridModule],
  templateUrl: './responsive.component.html',
  styleUrl: '../common.scss'
})
export class GridResponsiveExampleComponent { }
