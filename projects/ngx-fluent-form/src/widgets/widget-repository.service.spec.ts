import { TestBed } from '@angular/core/testing';
import { WIDGET_MAP } from '../tokens';
import { WidgetRepository } from './widget-repository.service';

describe('WidgetRepository', () => {
  let service: WidgetRepository;

  beforeEach(() => {
    TestBed.overrideProvider(WIDGET_MAP, { useValue: new Map() });
    service = TestBed.inject(WidgetRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
