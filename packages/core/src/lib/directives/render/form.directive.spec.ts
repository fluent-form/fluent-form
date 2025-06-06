import { Component, Signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { AnyObject } from '@ngify/core';
import { applyRoot, form } from '../../compose';
import { provideFluentForm } from '../../provider';
import { AbstractFormGroupSchema } from '../../schemas';
import { array, fieldGroup, group, textField, withTesting } from '../../testing';
import { FluentFormDirective } from './form.directive';
import { FluentFormRenderModule } from './module';

@Component({
  standalone: true,
  imports: [FluentFormRenderModule],
  template: `
    <div [fluentSchema]="schema()" [(fluentModel)]="model" (fluentFormChange)="form = $event">
      <fluent-outlet key="ipt" />
      <fluent-outlet key="ipts" />
      <fluent-outlet key="group.ipt" />
      <fluent-outlet key="group.ipts" />
      <fluent-outlet key="array" />
    </div>
  `
})
class TestComponent {
  @ViewChild(FluentFormDirective, { static: true }) fluentFormDirective!: FluentFormDirective<AnyObject>;
  form!: FormGroup;
  schema!: Signal<AbstractFormGroupSchema>;
  model!: AnyObject;
}

describe('FluentFormDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('submit event', () => {
    expect(component.fluentFormDirective.onSubmit({} as SubmitEvent)).toBe(false);
  });

  it('should be the expected model value', () => {
    component.schema = form(() => {
      textField('ipt');
      fieldGroup('ipts').schemas(() => {
        textField('ipt2');
      });
      group('group').schemas(() => {
        textField('ipt');
        fieldGroup('ipts').schemas(() => {
          textField('ipt2');
        });
      });
      array('array').schemas(() => {
        textField();
      });
    });
    component.model = {};
    fixture.detectChanges();

    expect(component.model).toEqual({
      ipt: null,
      ipt2: null,
      group: {
        ipt: null,
        ipt2: null
      },
      array: []
    });
  });

  describe('模型应该能正确赋值表单', () => {
    it('先设置 schema，后设置 model', () => {
      component.schema = form(() => {
        textField('ipt');
        fieldGroup('ipts').schemas(() => {
          textField('ipt2');
        });
        group('group').schemas(() => {
          textField('ipt');
          fieldGroup('ipts').schemas(() => {
            textField('ipt2');
          });
        });
        array('array').schemas(() => {
          textField();
        });
      });
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
          ipt2: 'test'
        },
        array: ['test']
      });
    });

    it('先设置 model，后设置 schema', () => {
      component.model = {
        ipt: 'test',
        ipt2: 'test',
        group: { ipt: 'test', ipt2: 'test' },
        array: ['test']
      };
      component.schema = form(() => {
        textField('ipt');
        fieldGroup('ipts').schemas(() => {
          textField('ipt2');
        });
        group('group').schemas(() => {
          textField('ipt');
          fieldGroup('ipts').schemas(() => {
            textField('ipt2');
          });
        });
        array('array').schemas(() => {
          textField();
        });
      });
      fixture.detectChanges();

      expect(component.form.value).toEqual({
        ipt: 'test',
        ipt2: 'test',
        group: {
          ipt: 'test',
          ipt2: 'test'
        },
        array: ['test']
      });
    });

    it('多次设置 model', () => {
      component.schema = form(() => {
        textField('ipt');
        fieldGroup('ipts').schemas(() => {
          textField('ipt2');
        });
        group('group').schemas(() => {
          textField('ipt');
          fieldGroup('ipts').schemas(() => {
            textField('ipt2');
          });
        });
        array('array').schemas(() => {
          textField();
        });
      });
      component.model = { ipt: 'test' };
      fixture.detectChanges();

      expect(component.form.value).toEqual({
        ipt: 'test',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null
        },
        array: []
      });

      component.model = { ipt: 'test change' };
      fixture.detectChanges();

      expect(component.form.value).toEqual({
        ipt: 'test change',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null
        },
        array: []
      });
    });
  });

  describe('表单应该能正确赋值模型', () => {
    it('先设置 schema，后设置 model', () => {
      component.schema = form(() => {
        textField('ipt').defaultValue('test');
        fieldGroup('ipts').schemas(() => {
          textField('ipt2').defaultValue('test');
        });
        group('group').schemas(() => {
          textField('ipt').defaultValue('test');
          fieldGroup('ipts').schemas(() => {
            textField('ipt2').defaultValue('test');
          });
        });
        array('array').schemas(() => {
          textField().defaultValue('test');
        });
      });
      component.model = {};
      fixture.detectChanges();

      expect(component.model).toEqual({
        ipt: 'test',
        ipt2: 'test',
        group: {
          ipt: 'test',
          ipt2: 'test'
        },
        array: []
      });
    });

    it('先设置 model，后设置 schema', () => {
      component.model = {};
      component.schema = form(() => {
        textField('ipt').defaultValue('test');
        fieldGroup('ipts').schemas(() => {
          textField('ipt2').defaultValue('test');
        });
        group('group').schemas(() => {
          textField('ipt').defaultValue('test');
          fieldGroup('ipts').schemas(() => {
            textField('ipt2').defaultValue('test');
          });
        });
        array('array').schemas(() => {
          textField().defaultValue('test');
        });
      });
      fixture.detectChanges();

      expect(component.model).toEqual({
        ipt: 'test',
        ipt2: 'test',
        group: {
          ipt: 'test',
          ipt2: 'test'
        },
        array: []
      });
    });

    it('多次设置 schema', () => {
      component.model = {};
      component.schema = form(() => {
        textField('ipt').defaultValue('test');
        fieldGroup('ipts').schemas(() => {
          textField('ipt2');
        });
        group('group').schemas(() => {
          textField('ipt');
          fieldGroup('ipts').schemas(() => {
            textField('ipt2');
          });
        });
        array('array').schemas(() => {
          textField();
        });
      });
      fixture.detectChanges();

      expect(component.model).toEqual({
        ipt: 'test',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null
        },
        array: []
      });

      component.schema = form(() => {
        textField('ipt').defaultValue('test change');
        fieldGroup('ipts').schemas(() => {
          textField('ipt2');
        });
        group('group').schemas(() => {
          textField('ipt');
          fieldGroup('ipts').schemas(() => {
            textField('ipt2');
          });
        });
        array('array').schemas(() => {
          textField();
        });
      });
      fixture.detectChanges();

      expect(component.model).toEqual({
        ipt: 'test',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null
        },
        array: []
      });
    });
  });

  it('should be the expected model value (configure the toplevel form)', () => {
    component.schema = form(() => {
      applyRoot({ updateOn: 'blur' });
      textField('ipt');
      fieldGroup('ipts').schemas(() => {
        textField('ipt2');
      });
      group('group').schemas(() => {
        textField('ipt');
        fieldGroup('ipts').schemas(() => {
          textField('ipt2');
        });
      });
      array('array').schemas(() => {
        textField();
      });
    });
    component.model = {};
    fixture.detectChanges();

    expect(component.model).toEqual({
      ipt: null,
      ipt2: null,
      group: {
        ipt: null,
        ipt2: null
      },
      array: []
    });
  });
});
