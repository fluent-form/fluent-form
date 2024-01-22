import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluentColComponent } from './col.component';

describe('FluentColComponent', () => {
  let component: FluentColComponent;
  let fixture: ComponentFixture<FluentColComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FluentColComponent]
    });
    fixture = TestBed.createComponent(FluentColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
