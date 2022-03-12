import { TimePosition } from "./time-position";

export interface Assignment extends TimePosition {
  readonly storeId: string;
  readonly employeeId: string;
}

export namespace Assignment {
  export function isEqual(a: Assignment, b: Assignment): boolean {
    return a.storeId === b.storeId && a.employeeId === b.employeeId && TimePosition.isEqual(a, b);
  }
}
