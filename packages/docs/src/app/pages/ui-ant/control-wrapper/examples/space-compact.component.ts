import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, number, select, spaceCompact, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'space-compact-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class SpaceCompactExampleComponent {
  schema = form(() => {
    spaceCompact().label('Text compact mode').col(4).schemas(() => {
      text('txt1').placeholder('Please enter').addons({ before: '@' }).col(6);
      text('txt2').placeholder('Please enter').affixes({ prefix: '@' }).col(6);
    })
    spaceCompact().label('Number compact mode').col(4).schemas(() => {
      number('price').placeholder('Please enter').affixes({ prefix: '#' }).col(6);
      number('price').placeholder('Please enter').addons({ before: '#' }).col(6);
    })
    spaceCompact().label('Text & number compact mode').col(4).schemas(() => {
      text('price').placeholder('Please enter').col(6);
      number('price').placeholder('Please enter').col(6);
    })

    spaceCompact().label('With button').col(4).schemas(() => {
      text('keyword').placeholder('Please enter').affixes({ prefix: '@' }).col('fill');
      button().type('primary').variants({ ghost: true }).content('Search');
    })
    spaceCompact().label('Number with button').col(4).schemas(() => {
      number('keyword').placeholder('Please enter').affixes({ prefix: '#' }).col('fill');
      button().type('primary').variants({ ghost: true }).content('Search');
    })
    spaceCompact().label('Text & Number with button').col(4).schemas(() => {
      text('keyword').placeholder('Please enter').col('fill');
      number('keyword').placeholder('Please enter').col('fill');
      button().type('primary').variants({ ghost: true }).content('Search');
    })
    spaceCompact().label('Text with other control').col(6).schemas(() => {
      select('protocol').style({ width: '90px' }).defaultValue('https').options([
        { label: 'http://', value: 'http' },
        { label: 'https://', value: 'https' },
      ]);
      text('url').placeholder('Please enter').col('fill');
      select('domain').style({ width: '80px' }).defaultValue('com').options([
        { label: '.com', value: 'com' },
        { label: '.cn', value: 'cn' },
        { label: '.net', value: 'net' },
        { label: '.org', value: 'org' },
      ]);
    })

    spaceCompact().label('Button compact mode').schemas(() => {
      button().content('Cancel');
      button().type('primary').content('Confirm');
    })

    spaceCompact().label('Mock multi suffixes').col(6).schemas(() => {
      const fakeText = () => text('')
        .readonly(true)
        .col({ flex: '75px' })
        .style({ padding: 0, textAlign: 'center', pointerEvents: 'none' });

      text('week').col('fill')
      fakeText().placeholder('周')
      text('day').col('fill')
      fakeText().placeholder('天')
    })

    spaceCompact().label('With addon & affix').col(6).schemas(() => {
      text('txt1').placeholder('Please enter').addons({ before: '@', after: '@' }).affixes({ prefix: '@' }).col(4);
      text('txt1').placeholder('Please enter').affixes({ prefix: '@' }).col(4);
      text('txt1').placeholder('Please enter').addons({ before: '@', after: '@' }).affixes({ suffix: '@' }).col(4);
    })
  });

  model = {};
}
