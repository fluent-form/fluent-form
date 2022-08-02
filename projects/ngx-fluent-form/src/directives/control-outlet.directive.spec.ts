import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { control, input } from '../builders';
import { FluentFormModule } from '../fluent-form.module';
import { ControlOutletDirective } from './control-outlet.directive';

@Component({
  template: `<ng-container *fluentControlOutlet="control; schema: schema; model: model">
  </ng-container>`
})
class TestingComponent {
  control = new FormControl(null);

  schema = control(input('ipt'));

  model = {};
}

describe('ControlOutletDirective', () => {
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingComponent, ControlOutletDirective],
      imports: [FluentFormModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be able to render form controls', () => {
    expect(fixture.debugElement.query(By.css('input'))).toBeTruthy();
  });
});
