import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FluentFormComponent, FluentGridModule, form, select } from 'ngx-fluent-form';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [FluentFormComponent, FluentGridModule, JsonPipe],
  templateUrl: './select-remote-data.component.html'
})
export class SelectRemoteDataExampleComponent {
  http = inject(HttpClient);

  schema = form(() => {
    select('user')
      .label('选择用户')
      .placeholder('输入关键字进行检索')
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
