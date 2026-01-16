import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-nav-progress-bar',
  template: `@if (navigating()) {<div></div>}`,
  styleUrl: './nav-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'sun-nav-progress-bar'
  }
})
export class NavProgressBar {
  readonly navigating = toSignal(
    inject(Router).events.pipe(
      filter(event =>
        [NavigationStart, NavigationEnd, NavigationError, NavigationCancel].some(o => event instanceof o)),
      map(event => event instanceof NavigationStart)
    ),
    { initialValue: true }
  );
}
