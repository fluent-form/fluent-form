import { Component } from '@angular/core';
import { checkbox, date, datetime, embed, form, number, radio, range, select, switcher, text, textarea, time } from 'projects/ngx-fluent-form/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schema = form(
    text('text')
      .placeholder('placeholder')
      .span(6)
      .label('label')
      .after({ icon: 'setting', template: 'setting' })
      .change((o, ctrl) => console.log('字段变更', o, ctrl))
      .required(true).errorTip('不不不'),
    number('number').label('label').placeholder('placeholder').span(6).max(100),
    date('date').label('label').placeholder('placeholder').span(6),
    range(['start', 'end']).label('label').placeholder(['place', 'holder']).span(6),
    time('time').label('label').placeholder('placeholder').span(6),
    switcher('switch').label('label').span(2),
    select('select').label('label').placeholder('placeholder').span(4).options({
      data: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }],
      label: 'name',
      value: 'id'
    }),
    textarea('content').label('内容').span(12).rows(5),
    embed('group').label('详情').span(24).schema(form(
      datetime('datetime')
        .placeholder('placeholder')
        .span(6)
        .label('label'),
      switcher('switch').label('label').span(2),
      radio('radio').label('单选').span(4).options({
        data: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }],
        label: 'name',
        value: 'id'
      }),
      date('date').label('label').span(6),

      embed('group').label('详情的详情').span(24).schema(form(
        checkbox('checkbox').label('label').span(4).options({
          data: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }],
          label: 'name',
          value: 'id'
        }),
        switcher('switch').label('label').span(2),
      ))
    ))
  );

  model = {
    text: 'hhh',
    date: 1665360000000,
    switch: true,
    number: 50,
    start: new Date('2000-11-19').getTime(),
    end: new Date('2010-11-19').getTime(),
    group: {
      date: 1665360000000,
      group: {
        text: '123',
        checkbox: [2]
      }
    }
  };

  onChange(event: any) {
    console.log(event);
  }
}
