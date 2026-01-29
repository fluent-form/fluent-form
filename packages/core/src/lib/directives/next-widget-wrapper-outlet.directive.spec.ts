import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFluentForm } from '../provider';
import { withTesting } from '../testing';
import { FluentNextWidgetWrapper } from './next-widget-wrapper-outlet.directive';

describe('FluentNextWidgetWrapper', () => {
  let component: FluentNextWidgetWrapper;
  let fixture: ComponentFixture<FluentNextWidgetWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });

    fixture = TestBed.createComponent(FluentNextWidgetWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
