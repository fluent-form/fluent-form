import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { withAllWidgets } from '../../features';
import { provideFluentForm } from '../../provider';
import { FluentControlOutletComponent } from './control-outlet.component';

describe('FluentControlOutletComponent', () => {
  let component: FluentControlOutletComponent<AnyObject | AnyArray>;
  let fixture: ComponentFixture<FluentControlOutletComponent<AnyObject | AnyArray>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });

    fixture = TestBed.createComponent(FluentControlOutletComponent);
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
