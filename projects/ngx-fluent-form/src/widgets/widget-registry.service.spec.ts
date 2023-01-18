import { TestBed } from '@angular/core/testing';
import { provideFluentForm } from '../provider';
import { WidgetRegistry } from './widget-registry.service';

describe('WidgetRegistry', () => {
  let service: WidgetRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideFluentForm()]
    });
    service = TestBed.inject(WidgetRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
