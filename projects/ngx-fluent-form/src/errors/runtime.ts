export function throwWidgetNotFoundError(name: string | number): never {
  throw new Error(`The '${name}' widget was not found`);
}

export function throwCustomTemplateNotFoundError(name: string | number): never {
  throw new Error(`The custom '${name}' template was not found`);
}
