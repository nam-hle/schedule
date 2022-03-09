import { Random } from "../random";

export type Position = Position.Kind;

export namespace Position {
  export enum Kind {
    Bartender = "bartender",
    Cashier = "cashier",
    Keeper = "keeper",
    Manager = "manager",
    Waiter = "waiter",
  }
  export const VALUES = Object.values(Kind);
  export const SIZE = VALUES.length;

  export function isEqual(a: Position, b: Position): boolean {
    return a === b;
  }

  export function fromString(str: string): Kind {
    const position = VALUES.find(value => value === str);
    if (position) {
      return position;
    }

    throw new Error(`Invalid position: ${str}`);
  }

  export function seed(): Kind {
    return Random.item(VALUES);
  }
}
