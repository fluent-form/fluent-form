import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { FluentFormColContentOutletComponent } from '../../components';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../directives';
import { FluentControlPipe, FluentReactivePipe } from '../../pipes';
import { SpaceComponentSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type SpaceWidgetTemplateContext = WidgetTemplateContext<SpaceComponentSchema, FormGroup>;

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    NzSpaceModule,
    FluentFormColContentOutletComponent,
    FluentBindingDirective,
    FluentReactivePipe,
    FluentContextGuardDirective,
    FluentControlPipe
  ],
  templateUrl: './space.widget.html',
})
export class SpaceWidget extends AbstractWidget<SpaceWidgetTemplateContext> { }
