import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[fluentInit],[fluentDestroy]',
  standalone: true
})
export class FluentLifeCycleDirective implements OnInit, OnDestroy {
  @Output() fluentInit = new EventEmitter<void>();
  @Output() fluentDestroy = new EventEmitter<void>();

  ngOnInit(): void {
    this.fluentInit.next();
  }

  ngOnDestroy(): void {
    this.fluentDestroy.next();
  }

}
