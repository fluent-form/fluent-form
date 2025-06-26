import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableArrayWidget } from './table-array.widget';

describe('TableArrayWidget', () => {
  let component: TableArrayWidget;
  let fixture: ComponentFixture<TableArrayWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TableArrayWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
