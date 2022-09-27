import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { button } from '../../builders';
import { FluentFormModule } from '../../fluent-form.module';
import { Arr, Obj } from '../../types';
import { standardSchema } from '../../utils';
import { FluentOutletComponent } from './outlet.component';

describe('FluentOutletComponent', () => {
  let component: FluentOutletComponent<Obj | Arr>;
  let fixture: ComponentFixture<FluentOutletComponent<Obj | Arr>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluentOutletComponent],
      imports: [FluentFormModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentOutletComponent);
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
