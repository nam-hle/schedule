export enum PositionKind {
  Bartender = "bartender",
  Cashier = "cashier",
  Keeper = "keeper",
  Manager = "manager",
  Waiter = "waiter",
}
export const POSITION_VALUES = Object.values(PositionKind);
export const NUM_POSITIONS = POSITION_VALUES.length;
