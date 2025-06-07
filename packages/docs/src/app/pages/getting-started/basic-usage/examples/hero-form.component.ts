import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form, headless } from '@fluent-form/core';
import { numberField, rate, textArea, textField, toggle } from '@fluent-form/ui-zorro';

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
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class HeroFormExampleComponent {
  readonly schema = form(() => {
    headless('id');
    textField('name').label('名称').required(true);
    textArea('power').label('能力').required(true);
    numberField('height').label('身高');
    rate('popularity').label('声望');
    toggle('enabled').label('状态').required(true).defaultValue(true);
  });

  readonly model = signal<Partial<Hero>>({
    name: 'SkyDog',
    power: 'Fetch any object at any distance',
    popularity: 3
  });
}
