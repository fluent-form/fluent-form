import { TestBed } from '@angular/core/testing';
import { CONFIG } from '../tokens';
import { FluentConfigDirective } from './config.directive';

describe('FluentConfigDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CONFIG,
          useValue: {
            layout: 'vertical',
            colon: true,
            gutter: { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }
          }
        }
      ]
    });
  });

  it('create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new FluentConfigDirective());

    expect(directive).toBeTruthy();
    expect(directive.layout).toEqual('vertical');
    expect(directive.colon).toBeTrue();
    expect(directive.gutter).toEqual({ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 });
  });
});
