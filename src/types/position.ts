import assert from "assert";

export enum PositionKind {
  Bartender = "bartender",
  Cashier = "cashier",
  Keeper = "keeper",
  Manager = "manager",
  Waiter = "waiter",
}
export const POSITION_VALUES = Object.values(PositionKind);
export const NUM_POSITIONS = POSITION_VALUES.length;

export namespace Position {
  export function fromString(position: string): PositionKind {
    assert(POSITION_VALUES.includes(position as PositionKind), `Invalid position: ${position}`);
    return position as PositionKind;
  }
}
