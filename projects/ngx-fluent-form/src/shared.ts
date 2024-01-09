const resolvedPromise = Promise.resolve();

export function queueMicrotask(callback: () => void) {
  return resolvedPromise.then(callback);
}
