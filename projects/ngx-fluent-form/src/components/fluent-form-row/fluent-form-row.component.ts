import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPONENT_TEMPLATE_REF_PROVIDER } from '../../providers';
import { AbstractFluentFormComponent } from '../abstract-fluent-form.component';

@Component({
  selector: '[fluent-form-row]',
  templateUrl: './fluent-form-row.component.html',
  styleUrls: ['./fluent-form-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [COMPONENT_TEMPLATE_REF_PROVIDER]
})
export class FluentFormRowComponent<T extends Record<string, unknown>> extends AbstractFluentFormComponent<T> {

  constructor() {
    super();
  }

}
