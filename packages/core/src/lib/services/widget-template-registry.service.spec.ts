import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { provideFluentForm } from '../provider';
import { withTesting } from '../testing';
import { InputWidget } from '../testing/widgets/input/input.widget';
import { WIDGET_MAP } from '../tokens';
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

  it('should keep the application unstable until the widget template is loaded', async () => {
    const app = TestBed.inject(ApplicationRef);
    let resolveWidget!: (widget: typeof InputWidget) => void;
    const widget = new Promise<typeof InputWidget>(resolve => {
      resolveWidget = resolve;
    });
    TestBed.inject(WIDGET_MAP).set('deferred', () => widget);
    await app.whenStable();

    const template = service.get('deferred');

    expect(await firstValueFrom(app.isStable)).toBe(false);
    expect(service.get('deferred')).toBe(template);

    resolveWidget(InputWidget);

    expect(await template).toBeTruthy();
    await app.whenStable();
    expect(await firstValueFrom(app.isStable)).toBe(true);
  });

  it.each(['rejected promise', 'synchronous throw'])(
    'should restore application stability after a loader failure: %s',
    async failure => {
      const app = TestBed.inject(ApplicationRef);
      const error = new Error('Widget loading failed');
      TestBed.inject(WIDGET_MAP).set('failing', () => {
        if (failure === 'synchronous throw') {
          throw error;
        }
        return Promise.reject(error);
      });

      await expect(service.get('failing')).rejects.toBe(error);
      await app.whenStable();

      expect(await firstValueFrom(app.isStable)).toBe(true);
    }
  );
});
