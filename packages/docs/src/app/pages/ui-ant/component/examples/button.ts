import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button } from '@fluent-form/ui-zorro';

@Component({
  selector: 'button-example',
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema" [(model)]="model" />`
})
export class ButtonExampleComponent {
  schema = form(() => {
    button().type('primary').content('确认');
    button().type('default').content('确认');
    button().type('dashed').content('确认');
    button().type('link').content('确认');
    button().type('text').content('确认');
    button().type('primary').variants({ ghost: true }).content('确认');
    button().type('primary').variants({ danger: true }).content('确认');
    button().type('primary').variants({ shape: 'round' }).content('确认');
    button().type('primary').variants({ shape: 'circle' }).icon('plus');
    button().type('primary').variants({ shape: 'round' }).icon('plus').content('添加');
    button().type('primary').variants({ block: true }).content('确认').col(12);
  })

  model = {};
}
