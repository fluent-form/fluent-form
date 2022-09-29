import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { array, form, group, input, inputGroup } from '../builders';
import { FluentFormModule } from '../fluent-form.module';
import { AnySchema, FormGroupSchema } from '../schemas';

@Component({
  template: `
    <div [fluentForm]="schemas" [(fluentModel)]="model">
      <fluent-schema-outlet name="ipts"></fluent-schema-outlet>
      <fluent-schema-outlet name="ipt"></fluent-schema-outlet>
      <ng-container fluentFormName="group">
        <fluent-schema-outlet name="ipt"></fluent-schema-outlet>
        <fluent-schema-outlet name="ipts"></fluent-schema-outlet>
      </ng-container>
      <ng-container fluentFormName="array">
        <fluent-schema-outlet [name]="0"></fluent-schema-outlet>
      </ng-container>
    </div>
  `
})
class TestingComponent {
  schemas!: AnySchema[] | FormGroupSchema;

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
