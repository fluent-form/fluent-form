import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { checkboxGroup } from '@fluent-form/ui-zorro';

@Component({
  selector: 'crud-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class CrudExampleComponent {
  readonly schema = form(() => {
    permissionCheckboxGroup().label('Permissions').required(true);
  });

  readonly model = signal({ permission: 3 });
}

enum Permissions {
  Default = 0, // 0 (0000)
  Create = 1 << 0, // 1 (0001)
  Read = 1 << 1, // 2 (0010)
  Update = 1 << 2, // 4 (0100)
  Delete = 1 << 3 // 8 (1000)
}

function formatPermission(value: Permissions) {
  return {
    [Permissions.Default]: '',
    [Permissions.Create]: 'Create',
    [Permissions.Read]: 'Read',
    [Permissions.Update]: 'Update',
    [Permissions.Delete]: 'Delete'
  }[value];
}

function permissionCheckboxGroup() {
  const flags = [
    Permissions.Create,
    Permissions.Read,
    Permissions.Update,
    Permissions.Delete
  ];
  const options = flags.map(flag => ({
    label: formatPermission(flag),
    value: flag
  }));
  return checkboxGroup('permission')
    .options(options)
    .mapper({
      // Enter a permission value and break it down into the values ​​required by the checkbox-group
      parser: (value: number) =>
        flags.filter(flag => (value & flag) > 0),
      // Combine the selected values ​​into the permission value through bitwise OR operation
      formatter: value =>
        (value as number[])?.reduce((acc, cur) => acc | cur, Permissions.Default)
    });
}
