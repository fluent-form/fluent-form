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
    expect(() => service.get('undefined')).toThrow(`The 'undefined' widget was not found`);
  });

  it('should register and retrieve a widget', async () => {
    expect(await service.get('text-field')).toBeTruthy();
    expect(await service.get('range')).toBeTruthy();
    expect(await service.get('number-field')).toBeTruthy();
  });
});
