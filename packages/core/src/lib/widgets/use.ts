import type { FluentFormWidgetConfig } from '../features';
import { type RowComponentSchema, SchemaType } from '../schemas';
import { RowWidget } from './row/row.widget';

export function useRowWidget(): FluentFormWidgetConfig<RowComponentSchema> {
  return {
    kind: 'row',
    type: SchemaType.ComponentContainer,
    widget: RowWidget
  };
}
