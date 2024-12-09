import { FluentColDirective, FluentRowDirective } from '../directives';

export interface Row {
  align?: ReturnType<FluentRowDirective['align']>;
  justify?: ReturnType<FluentRowDirective['justify']>;
  gap?: ReturnType<FluentRowDirective['gap']>;
}

export interface Column {
  span?: ReturnType<FluentColDirective['span']>;
  offset?: ReturnType<FluentColDirective['offset']>;
  flex?: ReturnType<FluentColDirective['flex']>;
}
