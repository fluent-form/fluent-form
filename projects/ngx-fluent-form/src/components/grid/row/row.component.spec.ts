import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluentRowComponent } from './row.component';

describe('FluentRowComponent', () => {
  let component: FluentRowComponent;
  let fixture: ComponentFixture<FluentRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FluentRowComponent]
    });
    fixture = TestBed.createComponent(FluentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
