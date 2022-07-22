import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Obj } from '../../type';
import { FluentTemplateComponent } from './fluent-template.component';


describe('FluentTemplateComponent', () => {
  let component: FluentTemplateComponent<Obj>;
  let fixture: ComponentFixture<FluentTemplateComponent<Obj>>;

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
