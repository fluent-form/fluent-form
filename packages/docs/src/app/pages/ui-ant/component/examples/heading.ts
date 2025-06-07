import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { heading1, heading2, heading3, heading4, heading5, heading6 } from '@fluent-form/ui-zorro';

@Component({
  selector: 'heading-example',
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class HeadingExampleComponent {
  readonly schema = form(() => {
    heading1().content('Heading 1');
    heading2().content('Heading 2');
    heading3().content('Heading 3');
    heading4().content('Heading 4');
    heading5().content('Heading 5');
    heading6().content('Heading 6');
  });

  readonly model = signal({});
}
