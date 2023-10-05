import { TestBed } from '@angular/core/testing';
import { withAllWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { WidgetTemplateRegistry } from './widget-template-registry.service';

describe('WidgetTemplateRegistry', () => {
  let service: WidgetTemplateRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });
    service = TestBed.inject(WidgetTemplateRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error', () => {
    expect(() => service.get('undefinded')).toThrowError(`The 'undefinded' template was not found`);
  });
});
