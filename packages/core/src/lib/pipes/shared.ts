import type { SafeAny } from '@ngify/core';
import type { ElementType } from '../schemas';

export function isElementConfig(value: unknown): value is Partial<Record<ElementType, SafeAny>> {
  return typeof value === 'object' && value !== null && ('host' in value || 'wrapper' in value);
}
