import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { array, form, group, input } from '../builders';
import { FluentFormModule } from '../fluent-form.module';

@Component({
  template: `
    <div [fluentForm]="schemas" [(fluentModel)]="model">
      <fluent-control-outlet name="ipt"></fluent-control-outlet>
      <ng-container fluentFormName="group">
        <fluent-control-outlet name="ipt"></fluent-control-outlet>
      </ng-container>
      <ng-container fluentFormName="array">
        <fluent-control-outlet [name]="0"></fluent-control-outlet>
      </ng-container>
    </div>
  `
})
class TestingComponent {
  schemas = form(
    input('ipt'),
    group('group').schemas(
      input('ipt')
    ),
    array('array').schemas(
      input()
    )
  );

  model = {};
}

describe('ControlOutletDirective', () => {
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingComponent],
      imports: [FluentFormModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component.model).toEqual({
      ipt: null,
      group: {
        ipt: null
      },
      array: [null]
    });
  });
});
