import { Component } from '@angular/core';
import { FluentGridModule } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentGridModule],
  templateUrl: './offset.component.html',
  styleUrls: ['../common.scss']
})
export class OffsetExampleComponent { }
