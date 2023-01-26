export const REST_SCHEMA = ['schemas'] as const;

export type RestSchema = typeof REST_SCHEMA[number];
export type KindAndName = 'kind' | 'name';
