import { TestBed } from '@angular/core/testing';
import { provideFluentForm } from '../provider';
import { FormFieldWrapper, withTesting } from '../testing';
import { WidgetWrapperTemplateRegistry } from './widget-wrapper-template-registry.service';

describe('WidgetWrapperTemplateRegistry', () => {
  let service: WidgetWrapperTemplateRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });
    service = TestBed.inject(WidgetWrapperTemplateRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register and retrieve a widget wrapper', async () => {
    expect(service.get(FormFieldWrapper)).toBeTruthy();
  });
});
