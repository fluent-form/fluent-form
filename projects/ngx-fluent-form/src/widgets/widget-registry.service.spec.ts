import { TestBed } from '@angular/core/testing';
import { WIDGET_MAP } from '../tokens';
import { WidgetRegistry } from './widget-registry.service';

describe('WidgetRegistry', () => {
  let service: WidgetRegistry;

  beforeEach(() => {
    TestBed.overrideProvider(WIDGET_MAP, { useValue: new Map() });
    service = TestBed.inject(WidgetRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
