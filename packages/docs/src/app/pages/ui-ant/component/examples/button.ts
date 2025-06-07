import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button } from '@fluent-form/ui-zorro';

@Component({
  selector: 'button-example',
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class ButtonExampleComponent {
  readonly schema = form(() => {
    button().type('primary').content('Primay Button');
    button().type('default').content('Default Button');
    button().type('dashed').content('Dashed Button');
    button().type('link').content('Link Button');
    button().type('text').content('Text Button');
    button().type('primary').variants({ ghost: true }).content('Ghost Button');
    button().type('primary').variants({ danger: true }).content('Danger Button');
    button().type('primary').variants({ shape: 'round' }).content('Rounded Button');
    button().type('primary').variants({ shape: 'circle' }).icon('plus');
    button().type('primary').variants({ shape: 'round' }).icon('plus').content('Icon Button');
    button().type('primary').variants({ block: true }).content('Block Button').listeners({
      click: () => console.log('click')
    });
  });

  readonly model = signal({});
}
