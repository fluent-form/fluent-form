import { EventEmitter, InjectionToken, QueryList, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AnyObject, SafeAny } from '@ngify/types';
import { type FluentTemplateDirective, type TemplateRefHolder } from './directives';
import { SchemaConfig } from './interfaces';
import { AbstractSchema } from './schemas';
import { AbstractWidget } from './widgets';

export const WIDGET_MAP = new InjectionToken<Map<string, Type<AbstractWidget<unknown>>>>('WidgetMap');

export const SCHEMA_MAP = new InjectionToken<Map<string, SchemaConfig<SafeAny>>>('SchemaMap');

export const TEMPLATE_DIRECTIVES = new InjectionToken<QueryList<FluentTemplateDirective>>('TemplateDirectives');

export const FLUENT_FORM_CONTENT = new InjectionToken<Type<TemplateRefHolder<{ form: FormGroup, model: AnyObject, schema: AbstractSchema, submit: EventEmitter<SafeAny> }>>>('FormContent');
