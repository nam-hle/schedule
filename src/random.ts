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

  export function items<T>(array: T[], count: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < count; i++) {
      result.push(item(array));
    }
    return result;
  }

  export function name(): string {
    return chance.name();
  }

  export function id(): string {
    return float(1).toString(36).substring(2, 5).toUpperCase();
  }
}
