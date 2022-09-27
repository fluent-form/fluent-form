import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { button } from '../../builders';
import { FluentFormModule } from '../../fluent-form.module';
import { Arr, Obj } from '../../types';
import { standardSchema } from '../../utils';
import { OutletComponent } from './outlet.component';

describe('OutletComponent', () => {
  let component: OutletComponent<Obj | Arr>;
  let fixture: ComponentFixture<OutletComponent<Obj | Arr>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutletComponent],
      imports: [FluentFormModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletComponent);
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
