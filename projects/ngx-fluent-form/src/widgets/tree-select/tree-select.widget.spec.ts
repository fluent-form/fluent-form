import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeSelectWidget } from './tree-select.widget';

describe('TreeSelectWidget', () => {
  let component: TreeSelectWidget;
  let fixture: ComponentFixture<TreeSelectWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSelectWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
