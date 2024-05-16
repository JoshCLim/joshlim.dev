export const validVertex = (v: number, nV: number) =>
  v !== null && v !== undefined && !isNaN(v) && v >= 0 && v < nV;

// lazy way to handle errors
function tryFunction<T>(f: () => T): T | undefined {
  try {
    return f();
  } catch (e) {
    // console.error(e);
    return;
  }
}

export function tryOrDefaultFunction<T>(f: () => T, def: T): T {
  return tryFunction(f) ?? def;
}
