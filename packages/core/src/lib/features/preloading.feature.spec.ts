import { APP_BOOTSTRAP_LISTENER, ApplicationRef, Component, ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFluentForm } from '../provider';
import { WidgetTemplateRegistry } from '../services';
import { withTesting } from '../testing';
import { withPreloading } from './preloading.feature';

describe('WidgetTemplateRegistry', () => {
  let service: WidgetTemplateRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting(),
          withPreloading()
        )
      ]
    });
    service = TestBed.inject(WidgetTemplateRegistry);
  });

  it('should preloading work', async () => {
    const appRef = TestBed.inject(ApplicationRef) as { components: ComponentRef<unknown>[] };
    const fixture = TestBed.createComponent(RootComponent);
    const rootRef = fixture.componentRef;
    const listeners = TestBed.inject(APP_BOOTSTRAP_LISTENER);

    appRef.components = [rootRef];
    listeners.forEach(listener => listener(rootRef));

    await new Promise(resolve => setTimeout(resolve, 500));
    expect(Map.prototype.get.call(service, 'range')).toBeTruthy();
    expect(Map.prototype.get.call(service, 'number-field')).toBeTruthy();
  });

  it('should be not preloading when bootstrapped cmp is not equal to appRef root cmp', async () => {
    const appRef = TestBed.inject(ApplicationRef) as { components: ComponentRef<unknown>[] };
    const fixture = TestBed.createComponent(RootComponent);
    const rootRef = fixture.componentRef;
    const listeners = TestBed.inject(APP_BOOTSTRAP_LISTENER);

    appRef.components = [];
    listeners.forEach(listener => listener(rootRef));

    await new Promise(resolve => setTimeout(resolve, 500));
    expect(Map.prototype.get.call(service, 'range')).toBeFalsy();
    expect(Map.prototype.get.call(service, 'number-field')).toBeFalsy();
  });
});

@Component({
  selector: 'app-root',
  template: ''
})
class RootComponent { }
