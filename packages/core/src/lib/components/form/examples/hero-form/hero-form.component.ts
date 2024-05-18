import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, FluentGridModule, form, headless, input, number, rate, textarea, toggle } from 'ngx-fluent-form';

interface Hero {
  id: number;
  /** 名称 **/
  name: string;
  /** 能力 **/
  power: string;
  /** 身高 **/
  height?: number;
  /** 声望 **/
  popularity?: number;
  /** 有效/无效 **/
  enabled: boolean;
}

@Component({
  standalone: true,
  imports: [FluentFormComponent, FluentGridModule, JsonPipe],
  templateUrl: './hero-form.component.html'
})
export class HeroFormExampleComponent {
  schema = form(() => {
    headless('id');
    input('name').label('名称').required(true);
    textarea('power').label('能力').required(true);
    number('height').label('身高');
    rate('popularity').label('声望');
    toggle('enabled').label('状态').required(true).defaultValue(true);
  });

  model: Partial<Hero> = {
    name: 'SkyDog',
    power: 'Fetch any object at any distance',
    popularity: 3
  };
}
