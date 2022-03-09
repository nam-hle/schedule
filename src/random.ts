import { Chance } from "chance";

const chance = new Chance();

export namespace Random {
  export function float(max: number): number;
  export function float(min: number, max: number): number;
  export function float(min: number, max?: number): number {
    const _min = max === undefined ? 0 : min;
    const _max = max === undefined ? min : max;
    return chance.floating({ min: 0, max: 1 }) * (_max - _min) + _min;
  }

  export function int(max: number): number;
  export function int(min: number, max: number): number;
  export function int(min: number, max?: number): number {
    const _min = max === undefined ? 0 : min;
    const _max = max === undefined ? min : max;
    return Math.floor(float(_min, _max));
  }

  export function item<T>(array: T[]): T {
    return array[int(0, array.length - 1)];
  }

  export function uniqueItems<T>(array: T[], count: number): T[] {
    const copied = [...array];
    for (let i = 0; i < array.length; i++) {
      const j = int(0, copied.length - 1);
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }

    return copied.slice(0, count);
  }

  export function name(): string {
    return chance.name();
  }

  export function id(): string {
    return float(1).toString(36).substring(2, 5).toUpperCase();
  }
}
