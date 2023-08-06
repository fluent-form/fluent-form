import { Provider } from '@angular/core';
import { SchemaPatcher, SchemaPatchFn, SchemaSelector } from '../interfaces';
import { AbstractSchema } from '../schemas';
import { SchemaType } from '../schemas/interfaces';
import { isObject } from '../utils';
import { makeFluentFeature, provideSchemaPatcher } from './helper';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export interface SchemaSelectorOptions {
  control?: boolean;
  controlContainer?: boolean;
  controlWrapper?: boolean;
  component?: boolean;
  componentContainer?: boolean;
  componentWrapper?: boolean;
}

export interface FluentFormSchemaPatcherFeature {
  selector: SchemaSelector | SchemaSelectorOptions;
  patch: SchemaPatchFn<AbstractSchema>;
}

function convertToSchemaTypeSelector(options: SchemaSelectorOptions): SchemaType {
  return 0 |
    ((options.control && SchemaType.Control) as number) |
    ((options.controlContainer && SchemaType.ControlContainer) as number) |
    ((options.controlWrapper && SchemaType.ControlWrapper) as number) |
    ((options.component && SchemaType.Component) as number) |
    ((options.componentContainer && SchemaType.ComponentContainer) as number) |
    ((options.componentWrapper && SchemaType.ComponentWrapper) as number);
}

export function withSchemaPatchers(...patchers: FluentFormSchemaPatcherFeature[]): FluentFormFeature<FluentFormFeatureKind.SchemaPatcher> {
  return makeFluentFeature(FluentFormFeatureKind.SchemaPatcher, [
    patchers.map<Provider>(patcher => {
      if (!Array.isArray(patcher.selector) && isObject(patcher.selector)) {
        patcher.selector = convertToSchemaTypeSelector(patcher.selector);
      }

      return provideSchemaPatcher(patcher as SchemaPatcher);
    })
  ]);
}
