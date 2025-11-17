import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { NgDocNavbarComponent, NgDocRootComponent, NgDocSidebarComponent, NgDocThemeToggleComponent } from '@ng-doc/app';
import { NgDocButtonIconComponent, NgDocIconComponent, NgDocTooltipDirective } from '@ng-doc/ui-kit';
import { catchError, EMPTY, map } from 'rxjs';
import { BrandComponent, NavProgressBar } from './components';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BrandComponent,
    NavProgressBar,
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
  readonly version = toSignal(
    inject(HttpClient)
      .get<{ name: string }[]>('https://api.github.com/repos/fluent-form/fluent-form/tags').pipe(
        map(tags => tags[0].name),
        catchError(() => EMPTY)
      )
  );
}
