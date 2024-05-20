import { FluentFormWidgetFeature } from '../features';
import { RowComponentSchema, SchemaType } from '../schemas';
import { RowWidget } from './row/row.widget';

export function useRowWidget(): FluentFormWidgetFeature<RowComponentSchema> {
  return {
    kind: 'row',
    type: SchemaType.ComponentContainer,
    widget: RowWidget
  };
}
