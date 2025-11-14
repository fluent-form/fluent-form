import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { CascaderControlSchema } from '../../schemas';
import CascaderWidget from './cascader.widget';

describe('CascaderWidget', () => {
  let component: CascaderWidget;
  let fixture: ComponentFixture<CascaderWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CascaderWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch options be work', async () => {
    const model = {};
    const schema: CascaderControlSchema = {
      kind: 'cascader',
      fetchOptions: () => new Promise<void>(resolve => {
        resolve();
      })
    };
    const control = new FormControl([]);

    expect(component.fetchOptions(model, { kind: 'cascader' }, control)({}, 0)).toBeUndefined();
    expect(component.fetchOptions(model, schema, control)({}, 0)).toBeInstanceOf(Promise);
  });
});
