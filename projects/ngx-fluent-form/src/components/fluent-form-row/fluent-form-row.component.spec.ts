import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluentFormRowComponent } from './fluent-form-row.component';


describe('FluentFormRowComponent', () => {
  let component: FluentFormRowComponent<{}>;
  let fixture: ComponentFixture<FluentFormRowComponent<{}>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluentFormRowComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentFormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
