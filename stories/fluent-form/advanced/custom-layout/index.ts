import { Component } from '@angular/core';
import { checkbox, form, group, input, inputGroup, number, textarea } from 'ngx-fluent-form';
import { AbstractFluentFormWrapperComponent, defineMeta, defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

@Component({
  selector: 'fluent-form-wrapper',
  template: `
    <div nz-row nzGutter="20">
      <nz-table #table [nzData]="list" nzSize="middle" nz-col nzFlex="2">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th nzWidth="175px">Address</th>
            <th>Cellphone</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of table.data; index as index" [fluentForm]="schemas" [(fluentModel)]="list[index]">
            <td>{{ index + 1 }}</td>
            <td>
              <fluent-schema-outlet name="name"></fluent-schema-outlet>
            </td>
            <td>
              <fluent-schema-outlet name="age"></fluent-schema-outlet>
            </td>
            <td nzWidth="175px">
              <fluent-schema-outlet name="address"></fluent-schema-outlet>
            </td>
            <td fluentFormName="info">
              <fluent-schema-outlet name="cellphone"></fluent-schema-outlet>
            </td>
            <td>
              <fluent-schema-outlet name="enabled"></fluent-schema-outlet>
            </td>
          </tr>
        </tbody>
      </nz-table>

      <div nz-col nzFlex="1">
        <pre>{{ list | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    pre { padding: 5px; background: #f5f5f5; border: 1px solid #e0e0e0 }
  `]
})
class FluentFormWrapperComponent extends AbstractFluentFormWrapperComponent {
  list: any;
  name = 'name'

  constructor() {
    super();

    this.schemas = form(
      inputGroup('name').schemas(
        input('firstName').span(8),
        input('lastName').span(16),
      ),
      number('age'),
      textarea('address'),
      group('info').schemas(
        input('cellphone'),
      ),
      checkbox('enabled')
    );

    this.list = [
      {
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        info: {
          cellphone: '1234567890'
        },
        enabled: true
      },
      {
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        enabled: true
      },
      {
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        enabled: false
      }
    ];
  }
}

export const meta = defineMeta({
  component: FluentFormWrapperComponent
});

export const story = defineStory();

export const source = dedent`
  import { Component } from '@angular/core';
  import { checkbox, form, group, input, inputGroup, number, textarea } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`
      <nz-table #table [nzData]="list" nzSize="middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th nzWidth="175px">Address</th>
            <th>Cellphone</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of table.data; index as index" [fluentForm]="schemas" [(fluentModel)]="list[index]">
            <td>{{ index + 1 }}</td>
            <td>
              <fluent-schema-outlet name="name"></fluent-schema-outlet>
            </td>
            <td>
              <fluent-schema-outlet name="age"></fluent-schema-outlet>
            </td>
            <td nzWidth="175px">
              <fluent-schema-outlet name="address"></fluent-schema-outlet>
            </td>
            <td fluentFormName="info">
              <fluent-schema-outlet name="cellphone"></fluent-schema-outlet>
            </td>
            <td>
              <fluent-schema-outlet name="enabled"></fluent-schema-outlet>
            </td>
          </tr>
        </tbody>
      </nz-table>
    \`
  })
  export class ExampleComponent {
    schemas = form(
      inputGroup('name').schemas(
        input('firstName').span(8),
        input('lastName').span(16),
      ),
      number('age'),
      textarea('address'),
      group('info').schemas(
        input('cellphone'),
      ),
      checkbox('enabled')
    );

    list = [
      {
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        info: {
          cellphone: '1234567890'
        },
        enabled: true
      },
      {
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        enabled: true
      },
      {
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        enabled: false
      }
    ];
  }
`;