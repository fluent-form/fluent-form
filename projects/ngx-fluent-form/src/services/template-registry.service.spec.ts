import { TestBed } from '@angular/core/testing';
import { withAllWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { TemplateRegistry } from './template-registry.service';

describe('WidgetRegistry', () => {
  let service: TemplateRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });
    service = TestBed.inject(TemplateRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
