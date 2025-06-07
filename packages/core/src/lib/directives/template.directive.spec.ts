import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NAMED_TEMPLATES } from '../tokens';
import { FluentTemplate } from './template.directive';

describe('FluentTemplateDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NAMED_TEMPLATES,
          useFactory: () => []
        }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should', () => {
    const templates = TestBed.inject(NAMED_TEMPLATES);
    fixture.detectChanges();

    expect(templates.length).toBe(1);
    expect(templates[0].name).toBe('tmpl1');

    component.flag.set(true);
    fixture.detectChanges();

    expect(templates.length).toBe(2);
    expect(templates[1].name).toBe('tmpl2');

    component.flag.set(false);
    fixture.detectChanges();

    expect(templates.length).toBe(1);
    expect(templates[0].name).toBe('tmpl1');
  });
});

@Component({
  imports: [FluentTemplate],
  template: `
    <ng-template fluentTemplate="tmpl1" />
    @if (flag()) {
      <ng-template fluentTemplate="tmpl2" />
    }
  `
})
class TestComponent {
  readonly flag = signal(false);
}
