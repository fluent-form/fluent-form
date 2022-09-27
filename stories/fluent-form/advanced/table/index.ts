import { Component } from '@angular/core';
import { form, group, input, number, textarea } from 'ngx-fluent-form';
import { AbstractFluentFormWrapperComponent, defineMeta, defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

@Component({
  selector: 'fluent-form-wrapper',
  template: `
    <div nz-row nzGutter="20">
      <nz-table #table [nzData]="list" nz-col nzFlex="2">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let data of table.data; index as index" [fluentForm]="schemas" [(fluentModel)]="list[index]">
            <td>{{ index + 1 }}</td>
            <td>
              <fluent-control-outlet name="name"></fluent-control-outlet>
            </td>
            <td>
              <fluent-control-outlet name="age"></fluent-control-outlet>
            </td>
            <td>
              <fluent-control-outlet name="address"></fluent-control-outlet>
            </td>
            <td fluentFormName="info">
              <ng-container fluentFormName="primary">
                <fluent-control-outlet name="cellphone"></fluent-control-outlet>
              </ng-container>
              <ng-container fluentFormName="secondary">
                <fluent-control-outlet name="cellphone"></fluent-control-outlet>
              </ng-container>
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
      input('name').class(['custom-class']),
      number('age'),
      textarea('address'),
      group('info').schemas(
        group('primary').schemas(
          input('cellphone'),
        ),
        group('secondary').schemas(
          input('cellphone'),
        ),
      )
    );

    this.list = [
      {
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        info: {
          primary: {
            cellphone: '1234567890'
          }
        }
      },
      {
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
      },
      {
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
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
  import { Validators } from '@angular/forms';
  import { form, input } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`
      <nz-table #table [nzData]="list">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let data of table.data; index as index" [fluentForm]="schemas" [(fluentModel)]="list[index]">
            <td>{{ index + 1 }}</td>
            <td>
              <fluent-control-outlet name="name"></fluent-control-outlet>
            </td>
            <td>
              <fluent-control-outlet name="age"></fluent-control-outlet>
            </td>
            <td>
              <fluent-control-outlet name="address"></fluent-control-outlet>
            </td>
            <td fluentFormName="info">
              <ng-container fluentFormName="primary">
                <fluent-control-outlet name="cellphone"></fluent-control-outlet>
              </ng-container>
              <ng-container fluentFormName="secondary">
                <fluent-control-outlet name="cellphone"></fluent-control-outlet>
              </ng-container>
            </td>
          </tr>
        </tbody>
      </nz-table>
    \`
  })
  export class ExampleComponent {
    schemas = form(
      input('name'),
      number('age'),
      textarea('address'),
      group('info').schemas(
        group('primary').schemas(
          input('cellphone'),
        ),
        group('secondary').schemas(
          input('cellphone'),
        ),
      )
    );

    list = [
      {
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        info: {
          primary: {
            cellphone: '1234567890'
          }
        }
      },
      {
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
      },
      {
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
      }
    ];
  }
`;