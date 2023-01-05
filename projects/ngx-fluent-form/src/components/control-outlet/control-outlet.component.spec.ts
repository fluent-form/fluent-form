import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { provideFluentForm } from '../../provide';
import { AnyArray, AnyObject } from '../../types';
import { FluentControlOutletComponent } from './control-outlet.component';

describe('FluentControlOutletComponent', () => {
  let component: FluentControlOutletComponent<AnyObject | AnyArray>;
  let fixture: ComponentFixture<FluentControlOutletComponent<AnyObject | AnyArray>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideFluentForm()]
    });
  });

  beforeEach(() => {
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
