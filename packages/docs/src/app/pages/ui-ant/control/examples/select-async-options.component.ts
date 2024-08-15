import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { select } from '@fluent-form/ui-zorro';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'select-async-options-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class SelectAsyncOptionsExampleComponent {
  http = inject(HttpClient);

  schema = form(() => {
    select('user')
      .placeholder('Please enter keywords to search')
      .fetchOptions(keyword$ =>
        keyword$.pipe(
          debounceTime(300),
          switchMap(keyword => this.searchUsers(keyword))
        )
      )
      .col(4);
  });

  model = {};

  searchUsers(keyword: string) {
    return this.http.get('https://api.randomuser.me/?results=5').pipe(
      catchError(() => of({ results: [] })),
      map((res: any) => res.results),
      map((list: any) => list.map((item: any) => {
        const username = `${item.name.first} ${keyword}`;
        return {
          value: username,
          label: username
        };
      }))
    );
  }
}
