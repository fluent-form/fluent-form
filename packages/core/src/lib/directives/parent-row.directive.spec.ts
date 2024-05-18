import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluentRowDirective } from './grid';
import { FluentParentRowDirective } from './parent-row.directive';

@Component({
  standalone: true,
  imports: [FluentRowDirective, FluentParentRowDirective],
  template: `
    <fluent-row #row1 [gap]="[1,2]">
      <fluent-row #row2 #parentRow1="fluentParentRow" [gap]="parentRow1.gap">
        <fluent-row #row3 #parentRow2="fluentParentRow" [gap]="parentRow2.gap">
          <fluent-row #row4 [gap]="[3,4]">
            <fluent-row #row5 #parentRow3="fluentParentRow" [gap]="parentRow3.gap"></fluent-row>
          </fluent-row>
        </fluent-row>
      </fluent-row>
    </fluent-row>
  `,
})
class TestComponent {
  @ViewChild('parentRow1', { static: true }) parentRow1!: FluentParentRowDirective;
  @ViewChild('parentRow2', { static: true }) parentRow2!: FluentParentRowDirective;
  @ViewChild('parentRow3', { static: true }) parentRow3!: FluentParentRowDirective;
}

describe('FluentParentRowDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get parent row component', () => {
    expect(component.parentRow1.gap).toEqual([1, 2]);
    expect(component.parentRow2.gap).toEqual([1, 2]);
    expect(component.parentRow3.gap).toEqual([3, 4]);
  });
});
