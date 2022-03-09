import { Random } from "../random";

export type Shift = Shift.Kind;

export namespace Shift {
  export enum Kind {
    MORNING_0 = "M0",
    MORNING_1 = "M1",
    MORNING_2 = "M2",
    AFTERNOON_0 = "A0",
    AFTERNOON_1 = "A1",
    EVENING_0 = "E0",
  }
  export const VALUES = Object.values(Kind);
  export const SIZE = VALUES.length;

  export function compare(shift1: Kind, shift2: Kind): number {
    return VALUES.indexOf(shift1) - VALUES.indexOf(shift2);
  }

  export function fromString(str: string): Kind {
    const shift = VALUES.find(shift => shift === str);
    if (shift) return shift;

    throw new Error(`Invalid shift: ${str}`);
  }

  export function seed(): Kind {
    return Random.item(VALUES);
  }
}
