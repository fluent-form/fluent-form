import { Component } from '@angular/core';
import { FluentGridModule } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentGridModule],
  templateUrl: './basic.component.html',
  styleUrls: ['../common.scss']
})
export class BasicExampleComponent { }
