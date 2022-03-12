import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluentFormComponent } from './fluent-form.component';

describe('FluentFormComponent', () => {
  let component: FluentFormComponent<{}>;
  let fixture: ComponentFixture<FluentFormComponent<{}>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluentFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
