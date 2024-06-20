import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { form } from '../../compose';
import { provideFluentForm } from '../../provider';
import { AbstractFormGroupSchema } from '../../schemas';
import { runMicrotask } from '../../shared';
import { array, group, inputGroup, text, withTesting } from '../../testing';
import { FluentFormDirective } from './form.directive';
import { FluentFormLayoutModule } from './module';

@Component({
  standalone: true,
  imports: [
    FluentFormLayoutModule
  ],
  template: `
    <div fluent-form [fluentSchema]="schema" [(fluentModel)]="model" (fluentFormChange)="form = $event">
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
  schema!: AbstractFormGroupSchema;
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

  it('should be the expected model value', async () => {
    component.schema = form(() => {
      text('ipt');
      inputGroup('ipts').schemas(() => {
        text('ipt2');
      });
      group('group').schemas(() => {
        text('ipt');
        inputGroup('ipts').schemas(() => {
          text('ipt2');
        });
      });
      array('array').schemas(() => {
        text();
      });
    });
    component.model = {};
    fixture.detectChanges();

    await runMicrotask(() => {
      expect(component.model).toEqual({
        ipt: null,
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null,
        },
        array: []
      });
    });
  });

  describe('模型应该能正确赋值表单', () => {
    it('先设置 schema，后设置 model', async () => {
      component.schema = form(() => {
        text('ipt');
        inputGroup('ipts').schemas(() => {
          text('ipt2');
        });
        group('group').schemas(() => {
          text('ipt');
          inputGroup('ipts').schemas(() => {
            text('ipt2');
          });
        });
        array('array').schemas(() => {
          text();
        });
      });
      component.model = {
        ipt: 'test',
        ipt2: 'test',
        group: { ipt: 'test', ipt2: 'test' },
        array: ['test']
      };
      fixture.detectChanges();

      await runMicrotask(() => {
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
    });

    it('先设置 model，后设置 schema', () => {
      component.model = {
        ipt: 'test',
        ipt2: 'test',
        group: { ipt: 'test', ipt2: 'test' },
        array: ['test']
      };
      component.schema = form(() => {
        text('ipt');
        inputGroup('ipts').schemas(() => {
          text('ipt2');
        });
        group('group').schemas(() => {
          text('ipt');
          inputGroup('ipts').schemas(() => {
            text('ipt2');
          });
        });
        array('array').schemas(() => {
          text();
        });
      });
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
      component.schema = form(() => {
        text('ipt');
        inputGroup('ipts').schemas(() => {
          text('ipt2');
        });
        group('group').schemas(() => {
          text('ipt');
          inputGroup('ipts').schemas(() => {
            text('ipt2');
          });
        });
        array('array').schemas(() => {
          text();
        });
      });
      component.model = { ipt: 'test' };
      fixture.detectChanges();

      expect(component.form.value).toEqual({
        ipt: 'test',
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null,
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
          ipt2: null,
        },
        array: []
      });
    });
  });

  describe('表单应该能正确赋值模型', () => {
    it('先设置 schema，后设置 model', async () => {
      component.schema = form(() => {
        text('ipt').defaultValue('test');
        inputGroup('ipts').schemas(() => {
          text('ipt2').defaultValue('test');
        });
        group('group').schemas(() => {
          text('ipt').defaultValue('test');
          inputGroup('ipts').schemas(() => {
            text('ipt2').defaultValue('test');
          });
        });
        array('array').schemas(() => {
          text().defaultValue('test');
        });
      });
      component.model = {};
      fixture.detectChanges();

      await runMicrotask(() => {
        expect(component.model).toEqual({
          ipt: 'test',
          ipt2: 'test',
          group: {
            ipt: 'test',
            ipt2: 'test',
          },
          array: []
        });
      });
    });

    it('先设置 model，后设置 schema', async () => {
      component.model = {};
      component.schema = form(() => {
        text('ipt').defaultValue('test');
        inputGroup('ipts').schemas(() => {
          text('ipt2').defaultValue('test');
        });
        group('group').schemas(() => {
          text('ipt').defaultValue('test');
          inputGroup('ipts').schemas(() => {
            text('ipt2').defaultValue('test');
          });
        });
        array('array').schemas(() => {
          text().defaultValue('test');
        });
      });
      fixture.detectChanges();

      await runMicrotask(() => {
        expect(component.model).toEqual({
          ipt: 'test',
          ipt2: 'test',
          group: {
            ipt: 'test',
            ipt2: 'test',
          },
          array: []
        });
      });
    });

    it('多次设置 schema', async () => {
      component.model = {};
      component.schema = form(() => {
        text('ipt').defaultValue('test');
        inputGroup('ipts').schemas(() => {
          text('ipt2');
        });
        group('group').schemas(() => {
          text('ipt');
          inputGroup('ipts').schemas(() => {
            text('ipt2');
          });
        });
        array('array').schemas(() => {
          text();
        });
      });
      fixture.detectChanges();

      await runMicrotask(() => {
        expect(component.model).toEqual({
          ipt: 'test',
          ipt2: null,
          group: {
            ipt: null,
            ipt2: null,
          },
          array: []
        });
      });

      component.schema = form(() => {
        text('ipt').defaultValue('test change');
        inputGroup('ipts').schemas(() => {
          text('ipt2');
        });
        group('group').schemas(() => {
          text('ipt');
          inputGroup('ipts').schemas(() => {
            text('ipt2');
          });
        });
        array('array').schemas(() => {
          text();
        });
      });
      fixture.detectChanges();

      await runMicrotask(() => {
        expect(component.model).toEqual({
          ipt: 'test',
          ipt2: null,
          group: {
            ipt: null,
            ipt2: null,
          },
          array: []
        });
      });
    });
  });

  it('should be the expected model value (configure the toplevel form)', async () => {
    component.schema = form(
      group().updateOn('blur').schemas(() => {
        text('ipt');
        inputGroup('ipts').schemas(() => {
          text('ipt2');
        });
        group('group').schemas(() => {
          text('ipt');
          inputGroup('ipts').schemas(() => {
            text('ipt2');
          });
        });
        array('array').schemas(() => {
          text();
        });
      })
    );
    component.model = {};
    fixture.detectChanges();

    await runMicrotask(() => {
      expect(component.model).toEqual({
        ipt: null,
        ipt2: null,
        group: {
          ipt: null,
          ipt2: null,
        },
        array: []
      });
    });
  });
});
