import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { button } from '../../builders';
import { FluentFormModule } from '../../fluent-form.module';
import { AnyArray, AnyObject } from '../../types';
import { standardSchema } from '../../utils';
import { FluentControlOutletComponent } from './control-outlet.component';

describe('FluentControlOutletComponent', () => {
  let component: FluentControlOutletComponent<AnyObject | AnyArray>;
  let fixture: ComponentFixture<FluentControlOutletComponent<AnyObject | AnyArray>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FluentControlOutletComponent,
        FluentFormModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentControlOutletComponent);
    component = fixture.componentInstance;
    component.control = new UntypedFormGroup({});
    component.schema = standardSchema(button());
    component.model = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
