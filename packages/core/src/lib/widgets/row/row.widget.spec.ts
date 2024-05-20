import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RowWidget } from './row.widget';

describe('RowWidget', () => {
  let component: RowWidget;
  let fixture: ComponentFixture<RowWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RowWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
