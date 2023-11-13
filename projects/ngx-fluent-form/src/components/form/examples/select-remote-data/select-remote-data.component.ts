import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormComponent, form, select } from 'ngx-fluent-form';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './select-remote-data.component.html'
})
export class SelectRemoteDataExampleComponent {
  http = inject(HttpClient);

  schema = form(() => {
    select('user')
      .label('选择用户')
      .placeholder('输入关键字进行检索')
      .fetchOptions(keywork$ =>
        keywork$.pipe(
          debounceTime(300),
          switchMap(keywork => this.searchUsers(keywork))
        )
      )
      .col(6);
  });

  model = {};

  searchUsers(keywork: string) {
    return this.http.get('https://api.randomuser.me/?results=5').pipe(
      catchError(() => of({ results: [] })),
      map((res: any) => res.results),
      map((list: any) => list.map((item: any) => {
        const username = `${item.name.first} ${keywork}`;
        return {
          value: username,
          label: username
        };
      }))
    );
  }
}
