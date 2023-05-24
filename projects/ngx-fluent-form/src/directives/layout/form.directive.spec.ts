import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { array, form, group, input, inputGroup } from '../../builders';
import { withAllWidgets } from '../../features';
import { provideFluentForm } from '../../provider';
import { AnySchema, FormGroupSchema } from '../../schemas';
import { FluentFormKeyDirective } from './form-name.directive';
import { FluentFormDirective } from './form.directive';
import { FluentOutletDirective } from './outlet.directive';

@Component({
  standalone: true,
  imports: [
    FluentFormDirective,
    FluentFormKeyDirective,
    FluentOutletDirective
  ],
  template: `
    <div fluent-form [fluentSchemas]="schemas" [(fluentModel)]="model" (fluentFormChange)="form = $event">
      <fluent-outlet name="ipt"></fluent-outlet>
      <fluent-outlet name="ipts"></fluent-outlet>
      <ng-container fluentFormKey="group">
        <fluent-outlet name="ipt"></fluent-outlet>
        <fluent-outlet name="ipts"></fluent-outlet>
      </ng-container>
      <ng-container fluentFormKey="array">
        <fluent-outlet [name]="0"></fluent-outlet>
      </ng-container>
    </div>
  `
})
class TestingComponent {
  form!: FormGroup;
  schemas!: AnySchema[] | FormGroupSchema;
  model!: AnyObject;
}

describe('FluentFormDirective', () => {
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });
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
    component.model = {};
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

  describe('模型应该能正确赋值表单', () => {
    it('先设置 schemas，后设置 model', () => {
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
      component.model = {
        ipt: 'test',
        ipt2: 'test',
        group: { ipt: 'test', ipt2: 'test' },
        array: ['test']
      };
      fixture.detectChanges();

      expect(component.model).toEqual({
        ipt: 'test',
        ipt2: 'test',
        group: {
          ipt: 'test',
          ipt2: 'test',
        },
        array: ['test']
      });
    });

    it('先设置 model，后设置 schemas', () => {
      component.model = {
        ipt: 'test',
        ipt2: 'test',
        group: { ipt: 'test', ipt2: 'test' },
        array: ['test']
      };
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

      expect(component.form.value).toEqual({
        ipt: 'test',
        ipt2: 'test',
        group: {
          ipt: 'test',
          ipt2: 'test',
        },
        array: ['test']
      });
    });

    it('多次设置 model', () => {
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
      component.model = { ipt: 'test' };
      fixture.detectChanges();

      expect(component.form.value).toEqual({
        ipt: 'test',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null,
        },
        array: [null]
      });

      component.model = { ipt: 'test change' };
      fixture.detectChanges();

      expect(component.form.value).toEqual({
        ipt: 'test change',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null,
        },
        array: [null]
      });
    });
  });

  describe('表单应该能正确赋值模型', () => {
    it('先设置 schemas，后设置 model', () => {
      component.schemas = form(
        input('ipt').defaultValue('test'),
        inputGroup('ipts').schemas(
          input('ipt2').defaultValue('test'),
        ),
        group('group').schemas(
          input('ipt').defaultValue('test'),
          inputGroup('ipts').schemas(
            input('ipt2').defaultValue('test'),
          ),
        ),
        array('array').schemas(
          input().defaultValue('test')
        )
      );
      component.model = {};
      fixture.detectChanges();

      expect(component.model).toEqual({
        ipt: 'test',
        ipt2: 'test',
        group: {
          ipt: 'test',
          ipt2: 'test',
        },
        array: ['test']
      });
    });

    it('先设置 model，后设置 schemas', () => {
      component.model = {};
      component.schemas = form(
        input('ipt').defaultValue('test'),
        inputGroup('ipts').schemas(
          input('ipt2').defaultValue('test'),
        ),
        group('group').schemas(
          input('ipt').defaultValue('test'),
          inputGroup('ipts').schemas(
            input('ipt2').defaultValue('test'),
          ),
        ),
        array('array').schemas(
          input().defaultValue('test')
        )
      );
      fixture.detectChanges();

      expect(component.model).toEqual({
        ipt: 'test',
        ipt2: 'test',
        group: {
          ipt: 'test',
          ipt2: 'test',
        },
        array: ['test']
      });
    });

    it('多次设置 schemas', () => {
      component.model = {};
      component.schemas = form(
        input('ipt').defaultValue('test'),
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
        ipt: 'test',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null,
        },
        array: [null]
      });

      component.schemas = form(
        input('ipt').defaultValue('test change'),
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
        ipt: 'test change',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null,
        },
        array: [null]
      });
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
    component.model = {};
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
