import { ComponentFixture, TestBed } from '@angular/core/testing';
import CollapseWidget from './collapse.widget';

describe('CollapseWidget', () => {
  let component: CollapseWidget;
  let fixture: ComponentFixture<CollapseWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
