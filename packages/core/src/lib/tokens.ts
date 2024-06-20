import { InjectionToken, QueryList, Type } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { AbstractFormContentComponent, AbstractFormItemContentComponent } from './components';
import { type FluentTemplateDirective } from './directives';
import { SchemaConfig } from './interfaces';
import { AbstractWidget } from './widgets/widget';

export const WIDGET_MAP = new InjectionToken<Map<string, Type<AbstractWidget<unknown>>>>('WidgetMap');

export const SCHEMA_MAP = new InjectionToken<Map<string, SchemaConfig<SafeAny>>>('SchemaMap');

export const TEMPLATE_DIRECTIVES = new InjectionToken<QueryList<FluentTemplateDirective>>('TemplateDirectives');

export const FLUENT_FORM_CONTENT = new InjectionToken<Type<AbstractFormContentComponent>>('FormContent');
export const FLUENT_FORM_ITEM_CONTENT = new InjectionToken<Type<AbstractFormItemContentComponent>>('FormItemContent');
