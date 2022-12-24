import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextWidget } from './text.widget';

describe('TextWidget', () => {
  let component: TextWidget;
  let fixture: ComponentFixture<TextWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
