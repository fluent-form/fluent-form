import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CascaderWidget } from './cascader.widget';

describe('CascaderWidget', () => {
  let component: CascaderWidget;
  let fixture: ComponentFixture<CascaderWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CascaderWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
