export const validVertex = (v: number, nV: number) =>
  !isNaN(v) && v >= 0 && v < nV;
