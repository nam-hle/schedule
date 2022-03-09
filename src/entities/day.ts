import { Random } from "../random";

export type Day = Day.Kind;

export namespace Day {
  export enum Kind {
    MON = "MON",
    TUE = "TUE",
    WED = "WED",
    THU = "THU",
    FRI = "FRI",
    SAT = "SAT",
    SUN = "SUN",
  }
  export const VALUES = Object.values(Kind);
  export const SIZE = VALUES.length;

  export function compare(date1: Kind, date2: Kind): number {
    return VALUES.indexOf(date1) - VALUES.indexOf(date2);
  }

  export function fromString(str: string): Kind {
    const kind = VALUES.find(date => date.toString() === str);
    if (kind) {
      return kind;
    }

    throw new Error(`Invalid date: ${str}`);
  }

  export function seed(): Kind {
    return Random.item(VALUES);
  }
}
