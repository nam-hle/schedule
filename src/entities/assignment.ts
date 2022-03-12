import { TimePosition } from "./time-position";

export interface Assignment extends TimePosition {
  readonly locationId: string;
  readonly employeeId: string;
}

export namespace Assignment {
  export function isEqual(a: Assignment, b: Assignment): boolean {
    return a.locationId === b.locationId && a.employeeId === b.employeeId && TimePosition.isEqual(a, b);
  }
}
