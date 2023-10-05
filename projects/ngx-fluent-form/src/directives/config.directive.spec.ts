import { TestBed } from '@angular/core/testing';
import { provideFluentForm } from '../provider';
import { FluentConfigDirective } from './config.directive';

describe('FluentConfigDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm()
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
