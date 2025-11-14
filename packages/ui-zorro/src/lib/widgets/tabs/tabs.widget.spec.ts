import { ComponentFixture, TestBed } from '@angular/core/testing';
import TabsWidget from './tabs.widget';

describe('TabsWidget', () => {
  let component: TabsWidget;
  let fixture: ComponentFixture<TabsWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
