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

export function arrayCreate<T>(length: number, fill: T) {
  return Array.from({ length }, () => fill);
}

export function pairMatch<T>(a1: T, a2: T, b1: T, b2: T): boolean {
  return (a1 == b1 && a2 == b2) || (a1 == b2 && a2 == b1);
}
