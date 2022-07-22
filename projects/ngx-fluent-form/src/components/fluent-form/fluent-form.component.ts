import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { COMPONENT_TEMPLATE_REF_PROVIDER } from '../../providers';
import { AbstractFluentFormComponent } from '../abstract-fluent-form.component';

@Component({
  selector: 'fluent-form',
  templateUrl: './fluent-form.component.html',
  styleUrls: ['./fluent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [COMPONENT_TEMPLATE_REF_PROVIDER]
})
export class FluentFormComponent<T extends Record<string, unknown>> extends AbstractFluentFormComponent<T> {

  @Input() layout: NzFormLayoutType = 'vertical';
  @Input() colon: boolean = true;
  @Input() spinning?: boolean;
  @Input() spinTip: string = 'Loading...';
  @Input() spinSize: NzSizeLDSType = 'large';

  constructor() {
    super();
  }

}
