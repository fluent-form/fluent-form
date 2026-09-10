import { Component, effect, signal, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluentTemplateOutlet } from './template-outlet';

interface TestContext {
  message: string;
  count: number;
}

@Component({
  imports: [FluentTemplateOutlet],
  template: `
    <ng-template #defaultTemplate let-message="message" let-count="count">
      Default: {{ message }} - {{ count }}
    </ng-template>
    <ng-template #customTemplate let-message="message" let-count="count">
      Custom: {{ message }} / {{ count }}
    </ng-template>

    <div *fluentTemplateOutlet="currentTemplate(); context: currentContext()">
      {{ currentTemplate() }}
    </div>
  `
})
class TestHostComponent {
  readonly defaultTemplateRef = viewChild.required('defaultTemplate', { read: TemplateRef });
  readonly customTemplateRef = viewChild.required('customTemplate', { read: TemplateRef });
  readonly viewContainerRef = viewChild.required(FluentTemplateOutlet, { read: ViewContainerRef });

  readonly currentTemplate = signal<TemplateRef<TestContext> | string>('');
  readonly currentContext = signal<TestContext | null>({ message: 'Initial', count: 0 });

  constructor() {
    effect(() => {
      this.currentTemplate.set(this.defaultTemplateRef());
    });
  }
}

describe('FluentTemplateOutlet', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should render with a TemplateRef and context', async () => {
    component.currentTemplate.set(component.defaultTemplateRef());
    component.currentContext.set({ message: 'Test Message', count: 42 });
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Default: Test Message - 42');
  });

  it('should render with a string (using host template) and context', async () => {
    component.currentTemplate.set('someString');
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('someString');
  });

  it('should update the view when context changes', async () => {
    component.currentTemplate.set(component.defaultTemplateRef());
    component.currentContext.set({ message: 'First', count: 1 });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Default: First - 1');

    component.currentContext.set({ message: 'Second', count: 2 });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Default: Second - 2');
  });

  it('should update the view when template changes', async () => {
    component.currentTemplate.set(component.defaultTemplateRef());
    component.currentContext.set({ message: 'Data', count: 10 });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Default: Data - 10');

    component.currentTemplate.set(component.customTemplateRef());
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Custom: Data / 10');
  });

  it('should handle null context gracefully', async () => {
    component.currentTemplate.set(component.defaultTemplateRef());
    component.currentContext.set(null);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Default:  -');
  });

  it('should clear previous view when template changes', async () => {
    component.currentTemplate.set(component.defaultTemplateRef());
    component.currentContext.set({ message: 'Initial', count: 1 });
    await fixture.whenStable();
    expect(component.viewContainerRef().length).toBe(1);

    component.currentTemplate.set(component.customTemplateRef());
    await fixture.whenStable();
    expect(component.viewContainerRef().length).toBe(1);
  });
});
