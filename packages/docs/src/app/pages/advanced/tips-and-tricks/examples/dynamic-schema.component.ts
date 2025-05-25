import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { textField } from '@fluent-form/ui-zorro';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'dynamic-schema-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe, NzButtonModule],
  template: `
    <button nz-button (click)="add()">Add user</button>
    <button nz-button (click)="remove()">Remove user</button>
    <br />
    <br />
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class DynamicSchemaExampleComponent {
  readonly counter = signal(1);
  readonly schema = form(() => {
    for (let index = 0; index < this.counter(); index++) {
      const number = index + 1;
      textField(`user-${number}`).label(`User ${number}`).col(6);
    }
  });

  readonly model = signal({});

  add() {
    this.counter.update(value => ++value)
  }

  remove() {
    this.counter.update(value => Math.max(1, --value))
  }
}
