import { TestBed } from '@angular/core/testing';
import { provideFluentForm } from '../provider';
import { withTesting } from '../testing';
import { WidgetTemplateRegistry } from './widget-template-registry.service';

describe('WidgetTemplateRegistry', () => {
  let service: WidgetTemplateRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });
    service = TestBed.inject(WidgetTemplateRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error', () => {
    expect(() => service.get('undefinded')).toThrow(`The 'undefinded' widget was not found`);
  });
});
