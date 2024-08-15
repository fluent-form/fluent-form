import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, buttonGroup } from '@fluent-form/ui-zorro';

@Component({
  selector: 'button-group-example',
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema" [(model)]="model" />`
})
export class ButtonGroupExampleComponent {
  schema = form(() => {
    buttonGroup().label('Basic').schemas(() => {
      button().content('Cancel');
      button().type('primary').content('Confirm');
    });
    // TODO
    // buttonGroup().label('With icon').schemas(() => {
    //   button().type('primary').icon('left').content('Go back');
    //   button().type('primary').icon({ after: 'right' }).content('Go forward');
    // });
  })

  model = {};
}
