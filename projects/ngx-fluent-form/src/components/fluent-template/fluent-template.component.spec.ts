import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Arr, Obj } from '../../types';
import { FluentTemplateComponent } from './fluent-template.component';

describe('FluentTemplateComponent', () => {
  let component: FluentTemplateComponent<Obj | Arr>;
  let fixture: ComponentFixture<FluentTemplateComponent<Obj | Arr>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluentTemplateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
