import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaWidget } from './textarea.widget';

describe('TextareaWidget', () => {
  let component: TextareaWidget;
  let fixture: ComponentFixture<TextareaWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
