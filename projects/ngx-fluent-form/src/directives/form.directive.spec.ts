import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { array, form, group, input } from '../builders';
import { FluentFormModule } from '../fluent-form.module';

@Component({
  template: `
    <div [fluentForm]="schemas" [(fluentModel)]="model">
      <fluent-schema-outlet name="ipt"></fluent-schema-outlet>
      <ng-container fluentFormName="group">
        <fluent-schema-outlet name="ipt"></fluent-schema-outlet>
      </ng-container>
      <ng-container fluentFormName="array">
        <fluent-schema-outlet [name]="0"></fluent-schema-outlet>
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
