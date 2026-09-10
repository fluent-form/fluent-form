import { Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { AnyObject } from '@ngify/core';
import { form } from '../../compose';
import { provideFluentForm } from '../../provider';
import { AbstractFormGroupSchema } from '../../schemas';
import { array, fieldGroup, group, textField, withTesting } from '../../testing';
import { FluentFormDirective } from './form.directive';
import { FluentFormRenderModule } from './module';

@Component({
  imports: [FluentFormRenderModule],
  template: `
    <div [fluentSchema]="schema()" [(fluentModel)]="model" (fluentFormChange)="form = $event">
      <fluent-outlet key="ipt" />
      <fluent-outlet key="ipts" />
      <fluent-outlet [key]="['group', 'ipt']" />
      <fluent-outlet [key]="['group', 'ipts']" />
      <fluent-outlet key="array" />
    </div>
  `
})
class TestComponent {
  @ViewChild(FluentFormDirective, { static: true }) fluentFormDirective!: FluentFormDirective<AnyObject>;
  form!: FormGroup;
  readonly schema = signal<AbstractFormGroupSchema>(form([]));
  readonly model = signal<AnyObject>({});
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

  it('should be the expected model value', async () => {
    component.schema.set(form(() => {
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
    })());
    component.model.set({});
    await fixture.whenStable();

    expect(component.model()).toEqual({
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
    it('先设置 schema，后设置 model', async () => {
      component.schema.set(form(() => {
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
      })());
      component.model.set({
        ipt: 'test',
        ipt2: 'test',
        group: { ipt: 'test', ipt2: 'test' },
        array: ['test']
      });
      await fixture.whenStable();

      expect(component.model()).toEqual({
        ipt: 'test',
        ipt2: 'test',
        group: {
          ipt: 'test',
          ipt2: 'test'
        },
        array: ['test']
      });
    });

    it('先设置 model，后设置 schema', async () => {
      component.model.set({
        ipt: 'test',
        ipt2: 'test',
        group: { ipt: 'test', ipt2: 'test' },
        array: ['test']
      });
      component.schema.set(form(() => {
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
      })());
      await fixture.whenStable();

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

    it('多次设置 model', async () => {
      component.schema.set(form(() => {
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
      })());
      component.model.set({ ipt: 'test' });
      await fixture.whenStable();

      expect(component.form.value).toEqual({
        ipt: 'test',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null
        },
        array: []
      });

      component.model.set({ ipt: 'test change' });
      await fixture.whenStable();

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
    it('先设置 schema，后设置 model', async () => {
      component.schema.set(form(() => {
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
      })());
      component.model.set({});
      await fixture.whenStable();

      expect(component.model()).toEqual({
        ipt: 'test',
        ipt2: 'test',
        group: {
          ipt: 'test',
          ipt2: 'test'
        },
        array: []
      });
    });

    it('先设置 model，后设置 schema', async () => {
      component.model.set({});
      component.schema.set(form(() => {
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
      })());
      await fixture.whenStable();

      expect(component.model()).toEqual({
        ipt: 'test',
        ipt2: 'test',
        group: {
          ipt: 'test',
          ipt2: 'test'
        },
        array: []
      });
    });

    it('多次设置 schema', async () => {
      component.model.set({});
      component.schema.set(form(() => {
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
      })());
      await fixture.whenStable();

      expect(component.model()).toEqual({
        ipt: 'test',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null
        },
        array: []
      });

      component.schema.set(form(() => {
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
      })());
      await fixture.whenStable();

      expect(component.model()).toEqual({
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

  it('should be the expected model value', async () => {
    component.schema.set(form(() => {
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
    })());
    component.model.set({});
    await fixture.whenStable();

    expect(component.model()).toEqual({
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
