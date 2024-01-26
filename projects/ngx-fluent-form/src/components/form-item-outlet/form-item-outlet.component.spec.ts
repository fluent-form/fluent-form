import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { withAllWidgets } from '../../features';
import { provideFluentForm } from '../../provider';
import { FluentFormItemOutletComponent } from './form-item-outlet.component';

describe('FluentFormItemOutletComponent', () => {
  let component: FluentFormItemOutletComponent<AnyObject | AnyArray>;
  let fixture: ComponentFixture<FluentFormItemOutletComponent<AnyObject | AnyArray>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });

    fixture = TestBed.createComponent(FluentFormItemOutletComponent);
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
