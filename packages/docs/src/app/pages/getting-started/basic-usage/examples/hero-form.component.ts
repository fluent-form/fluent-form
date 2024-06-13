import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { headless, input, number, rate, textarea, toggle } from '@fluent-form/ui-zorro';

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
  selector: 'hero-form-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
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
