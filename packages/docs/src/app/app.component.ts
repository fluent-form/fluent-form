import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgDocNavbarComponent, NgDocRootComponent, NgDocSidebarComponent, NgDocThemeToggleComponent } from '@ng-doc/app';
import { NgDocButtonIconComponent, NgDocIconComponent, NgDocTooltipDirective } from '@ng-doc/ui-kit';
import { map, shareReplay } from 'rxjs';
import { BrandComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [
    AsyncPipe,
    RouterOutlet,
    BrandComponent,
    NgDocRootComponent,
    NgDocNavbarComponent,
    NgDocSidebarComponent,
    NgDocIconComponent,
    NgDocButtonIconComponent,
    NgDocThemeToggleComponent,
    NgDocTooltipDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  version$ = inject(HttpClient)
    .get<{ name: string }[]>('https://api.github.com/repos/fluent-form/fluent-form/tags').pipe(
      map(tags => tags[0].name),
      shareReplay(1)
    );
}
