const resolvedPromise = Promise.resolve();

export function runMicrotask(callback: () => void) {
  return resolvedPromise.then(callback);
}
