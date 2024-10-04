import { Directive, OnDestroy, OnInit, output } from '@angular/core';

/**
 * @internal
 */
@Directive({
  selector: '[fluentInit],[fluentDestroy]',
  standalone: true
})
export class FluentLifeCycleDirective implements OnInit, OnDestroy {
  fluentInit = output();
  fluentDestroy = output();

  ngOnInit(): void {
    this.fluentInit.emit();
  }

  ngOnDestroy(): void {
    this.fluentDestroy.emit();
  }

}
