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
    const appRef = TestBed.inject(ApplicationRef) as { components: ComponentRef<unknown>[] };
    const fixture = TestBed.createComponent(RootComponent);
    const rootRef = fixture.componentRef;
    const listeners = TestBed.inject(APP_BOOTSTRAP_LISTENER);

    appRef.components = [rootRef];

    listeners.forEach(listener => listener(rootRef));
  });

  it('should preloading work', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(Map.prototype.get.call(service, 'text-field')).toBeTruthy();
    expect(Map.prototype.get.call(service, 'range')).toBeTruthy();
    expect(Map.prototype.get.call(service, 'number-field')).toBeTruthy();
  });
});

@Component({
  selector: 'app-root',
  template: ''
})
class RootComponent { }
