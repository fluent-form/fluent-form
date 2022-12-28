import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { array, form, group, input, inputGroup } from '../builders';
import { FluentFormModule } from '../fluent-form.module';
import { AnySchema, FormGroupSchema } from '../schemas';

@Component({
  template: `
    <div [fluentForm]="schemas" [(fluentModel)]="model">
      <fluent-outlet name="ipts"></fluent-outlet>
      <fluent-outlet name="ipt"></fluent-outlet>
      <ng-container fluentFormName="group">
        <fluent-outlet name="ipt"></fluent-outlet>
        <fluent-outlet name="ipts"></fluent-outlet>
      </ng-container>
      <ng-container fluentFormName="array">
        <fluent-outlet [name]="0"></fluent-outlet>
      </ng-container>
    </div>
  `
})
class TestingComponent {
  schemas!: AnySchema[] | FormGroupSchema;
  model = {};
}

describe('FluentFormDirective', () => {
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
  });

  it('should be the expected model value', () => {
    component.schemas = form(
      input('ipt'),
      inputGroup('ipts').schemas(
        input('ipt2'),
      ),
      group('group').schemas(
        input('ipt'),
        inputGroup('ipts').schemas(
          input('ipt2'),
        ),
      ),
      array('array').schemas(
        input()
      )
    );
    fixture.detectChanges();

    expect(component.model).toEqual({
      ipt: null,
      ipt2: null,
      group: {
        ipt: null,
        ipt2: null,
      },
      array: [null]
    });
  });

  it('should be the expected model value (configure the toplevel form)', () => {
    component.schemas = form(it => it.updateOn('blur').schemas(
      input('ipt'),
      inputGroup('ipts').schemas(
        input('ipt2'),
      ),
      group('group').schemas(
        input('ipt'),
        inputGroup('ipts').schemas(
          input('ipt2'),
        ),
      ),
      array('array').schemas(
        input()
      )
    ));

    fixture.detectChanges();

    expect(component.model).toEqual({
      ipt: null,
      ipt2: null,
      group: {
        ipt: null,
        ipt2: null,
      },
      array: [null]
    });
  });
});
