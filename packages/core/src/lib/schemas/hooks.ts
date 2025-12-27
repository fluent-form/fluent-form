import type { DestroyRef } from '@angular/core';
import type { SchemaContext, SchemaLike } from './interfaces';

export interface HooksHolder<S extends SchemaLike = SchemaLike> {
  hooks?: {
    onInit?: (context: SchemaContext<S> & { destroyRef: DestroyRef }) => void;
    onDestroy?: (context: SchemaContext<S>) => void;
  };
}
