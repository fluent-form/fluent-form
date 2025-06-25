import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form, headless } from '@fluent-form/core';
import { numberField, rate, textArea, textField, toggle } from '@fluent-form/ui-zorro';

interface Hero {
  id: number;
  name: string;
  power: string;
  height?: number;
  popularity?: number;
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
    textField('name').label('Name').required(true);
    textArea('power').label('Poser').required(true);
    numberField('height').label('Height');
    rate('popularity').label('Popularity');
    toggle('enabled').label('Status').required(true).defaultValue(true);
  });

  readonly model = signal<Partial<Hero>>({
    name: 'SkyDog',
    power: 'Fetch any object at any distance',
    popularity: 3
  });
}
