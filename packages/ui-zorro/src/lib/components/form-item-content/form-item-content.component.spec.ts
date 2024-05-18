import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { provideFluentForm } from '@fluent-form/core';
import { AnyArray, AnyObject } from '@ngify/types';
import { withZorro } from '../../feature';
import { useAllWidgets } from '../../widgets';
import { FluentFormItemContentComponent } from './form-item-content.component';

describe('FluentFormItemOutletComponent', () => {
  let component: FluentFormItemContentComponent<AnyObject | AnyArray>;
  let fixture: ComponentFixture<FluentFormItemContentComponent<AnyObject | AnyArray>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withZorro(useAllWidgets())
        )
      ]
    });

    fixture = TestBed.createComponent(FluentFormItemContentComponent);
    component = fixture.componentInstance;
    component.control = new FormGroup({});
    component.schema = { kind: 'button' };
    component.model = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
