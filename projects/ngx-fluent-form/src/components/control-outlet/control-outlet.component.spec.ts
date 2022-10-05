import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { button } from '../../builders';
import { FluentFormModule } from '../../fluent-form.module';
import { Arr, Obj } from '../../types';
import { standardSchema } from '../../utils';
import { FluentControlOutletComponent } from './control-outlet.component';

describe('FluentControlOutletComponent', () => {
  let component: FluentControlOutletComponent<Obj | Arr>;
  let fixture: ComponentFixture<FluentControlOutletComponent<Obj | Arr>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluentControlOutletComponent],
      imports: [FluentFormModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentControlOutletComponent);
    component = fixture.componentInstance;
    component.control = new FormGroup({});
    component.schema = standardSchema(button());
    component.model = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
