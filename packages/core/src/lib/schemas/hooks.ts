import type { SchemaContext, SchemaLike } from './interfaces';

export interface HooksHolder<S extends SchemaLike = SchemaLike> {
  hooks?: {
    onInit?: (context: SchemaContext<S>) => void;
    onDestroy?: (context: SchemaContext<S>) => void;
  }
}
