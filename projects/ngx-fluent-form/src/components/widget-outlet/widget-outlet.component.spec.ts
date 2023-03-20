import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { withAllWidgets } from '../../features';
import { provideFluentForm } from '../../provider';
import { FluentWidgetOutletComponent } from './widget-outlet.component';

describe('FluentWidgetOutletComponent', () => {
  let component: FluentWidgetOutletComponent<AnyObject | AnyArray>;
  let fixture: ComponentFixture<FluentWidgetOutletComponent<AnyObject | AnyArray>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });

    fixture = TestBed.createComponent(FluentWidgetOutletComponent);
    component = fixture.componentInstance;
    component.control = new FormGroup({});
    component.schema = { kind: 'button' };
    component.model = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
