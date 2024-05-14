import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(min: number, actual: number, max: number) {
  if (actual < min) return min;
  if (actual > max) return max;
  return actual;
}

export function arrayDeepCopy<T>(items: T[]): T[] {
  return items.flatMap((item) =>
    Array.isArray(item) ? arrayDeepCopy(item) : item,
  ) as T[];
}

export function array2DCreate<T>(rows: number, cols: number, fill: T) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => fill),
  );
}

export function arrayCreate<T>(length: number, fill: T) {
  return Array.from({ length }, () => fill);
}
