import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFluentForm } from '@fluent-form/core';
import { withZorro } from '../../feature';
import { useAllWidgets } from '../../widgets';
import { FluentFormItemContentComponent } from './form-item-content.component';

describe('FluentFormItemOutletComponent', () => {
  let component: FluentFormItemContentComponent;
  let fixture: ComponentFixture<FluentFormItemContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withZorro(useAllWidgets())
        )
      ]
    });

    fixture = TestBed.createComponent(FluentFormItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
