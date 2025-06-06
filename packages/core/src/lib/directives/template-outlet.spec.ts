import { Component, OnInit, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluentTemplateOutlet } from './template-outlet';

interface TestContext {
  message: string;
  count: number;
}

@Component({
  standalone: true,
  imports: [FluentTemplateOutlet],
  template: `
    <ng-template #defaultTemplate let-message="message" let-count="count">
      Default: {{ message }} - {{ count }}
    </ng-template>
    <ng-template #customTemplate let-message="message" let-count="count">
      Custom: {{ message }} / {{ count }}
    </ng-template>

    <div *fluentTemplateOutlet="currentTemplate; context: currentContext">
      {{ currentTemplate }}
    </div>
  `
})
class TestHostComponent implements OnInit {
  readonly defaultTemplateRef = viewChild.required('defaultTemplate', { read: TemplateRef });
  readonly customTemplateRef = viewChild.required('customTemplate', { read: TemplateRef });
  readonly viewContainerRef = viewChild.required(FluentTemplateOutlet, { read: ViewContainerRef });

  currentTemplate: TemplateRef<TestContext> | string = '';
  currentContext: TestContext | null = { message: 'Initial', count: 0 };

  ngOnInit() {
    this.currentTemplate = this.defaultTemplateRef();
  }
}

describe('FluentTemplateOutlet', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render with a TemplateRef and context', () => {
    component.currentTemplate = component.defaultTemplateRef();
    component.currentContext = { message: 'Test Message', count: 42 };
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Default: Test Message - 42');
  });

  it('should render with a string (using host template) and context', () => {
    component.currentTemplate = 'someString';
    fixture.detectChanges();
    TestBed.flushEffects();
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('someString');
  });

  it('should update the view when context changes', () => {
    component.currentTemplate = component.defaultTemplateRef();
    component.currentContext = { message: 'First', count: 1 };
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Default: First - 1');

    component.currentContext = { message: 'Second', count: 2 };
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Default: Second - 2');
  });

  it('should update the view when template changes', () => {
    component.currentTemplate = component.defaultTemplateRef();
    component.currentContext = { message: 'Data', count: 10 };
    fixture.detectChanges();
    TestBed.flushEffects();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Default: Data - 10');

    component.currentTemplate = component.customTemplateRef();
    fixture.detectChanges();
    TestBed.flushEffects();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Custom: Data / 10');
  });

  it('should handle null context gracefully', () => {
    component.currentTemplate = component.defaultTemplateRef();
    component.currentContext = null;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Default:  -');
  });

  it('should clear previous view when template changes', () => {
    component.currentTemplate = component.defaultTemplateRef();
    component.currentContext = { message: 'Initial', count: 1 };
    fixture.detectChanges();
    expect(component.viewContainerRef().length).toBe(1);

    component.currentTemplate = component.customTemplateRef();
    fixture.detectChanges();
    expect(component.viewContainerRef().length).toBe(1);
  });
});
