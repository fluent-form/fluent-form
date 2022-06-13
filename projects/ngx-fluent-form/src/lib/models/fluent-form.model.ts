import { Builder } from '../utils/builder.utils';
import { standardSchemas } from '../utils/schema.utils';
import { AnyControlBuilder, AnyControlName, AnyControlSchema, SingleKeyControlName, VirtualControlSchema } from './schema.model';

export class FluentSchema {
  readonly schemas: AnyControlSchema[];

  constructor(schemas: AnyControlSchema[]) {
    this.schemas = schemas;
  }

  get<T extends AnyControlSchema = AnyControlSchema>(name: AnyControlName): T | undefined;
  get<T extends AnyControlSchema = AnyControlSchema>(path: [...SingleKeyControlName[], AnyControlName]): T | undefined;
  get<T extends AnyControlSchema = AnyControlSchema>(path: AnyControlName | [...SingleKeyControlName[], AnyControlName]): T | undefined;
  get<T extends AnyControlSchema = AnyControlSchema>(path: AnyControlName | [...SingleKeyControlName[], AnyControlName]): T | undefined {
    return findSchema(this.schemas, path);
  }

  insert(index: number, schema: AnyControlSchema | Builder<AnyControlSchema, AnyControlSchema, {}>) {

  }
}

function findSchema<T extends AnyControlSchema = AnyControlSchema>(schemas: AnyControlSchema[], name: AnyControlName): T | undefined;
function findSchema<T extends AnyControlSchema = AnyControlSchema>(schemas: AnyControlSchema[], path: [...SingleKeyControlName[], AnyControlName]): T | undefined;
function findSchema<T extends AnyControlSchema = AnyControlSchema>(schemas: AnyControlSchema[], path: AnyControlName | [...SingleKeyControlName[], AnyControlName]): T | undefined;
function findSchema<T extends AnyControlSchema = AnyControlSchema>(schemas: AnyControlSchema[], path: AnyControlName | [...SingleKeyControlName[], AnyControlName]): T | undefined {
  if (Array.isArray(path)) {
    const [endPath, ...beforePath] = path.reverse() as [AnyControlName, ...SingleKeyControlName[]];
    schemas = beforePath.reduceRight((schemas, name) => (
      (schemas.find(o => o.name === name) as VirtualControlSchema).schemas as AnyControlSchema[]
    ), schemas as AnyControlSchema[]);
    return findSchema(schemas, endPath);
  }

  return schemas.find(o => {
    if (Array.isArray(o.name) && Array.isArray(path)) {
      return arraysEqual(o.name, path);
    }

    return o.name === path;
  }) as T | undefined;
}

function arraysEqual(a: unknown[], b: unknown[]): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

export const form = (...schemas: (AnyControlSchema | AnyControlBuilder)[]) => {
  return new FluentSchema(standardSchemas(schemas));
}
