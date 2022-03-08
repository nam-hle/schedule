export namespace Random {
  export function getFloat(max: number): number;
  export function getFloat(min: number, max: number): number;
  export function getFloat(min: number, max?: number): number {
    const _min = max === undefined ? 0 : min;
    const _max = max === undefined ? min : max;
    return Math.random() * (_max - _min) + _min;
  }

  export function getInt(max: number): number;
  export function getInt(min: number, max: number): number;
  export function getInt(min: number, max?: number): number {
    const _min = max === undefined ? 0 : min;
    const _max = max === undefined ? min : max;
    return Math.floor(getFloat(_min, _max));
  }

  export function getArrayItem<T>(array: T[]): T {
    return array[getInt(0, array.length - 1)];
  }

  export function getArrayItems<T>(array: T[], count: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < count; i++) {
      result.push(getArrayItem(array));
    }
    return result;
  }
}
