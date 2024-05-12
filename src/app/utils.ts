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
