import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFluentForm } from '@fluent-form/core';
import { withZorro } from '../../feature';
import { useAllWidgets } from '../../widgets';
import { FormItemContentComponent } from './form-item-content.component';

describe('FluentFormItemOutletComponent', () => {
  let component: FormItemContentComponent;
  let fixture: ComponentFixture<FormItemContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withZorro(useAllWidgets())
        )
      ]
    });

    fixture = TestBed.createComponent(FormItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
