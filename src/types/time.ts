import assert from "assert";

/**
 * Date
 */
import { DELIMITER } from "./utils";

export enum DateKind {
  MON = "MON",
  TUE = "TUE",
  WED = "WED",
  THU = "THU",
  FRI = "FRI",
  SAT = "SAT",
  SUN = "SUN",
}
export const DATE_VALUES = Object.values(DateKind);
export const NUM_DATES = DATE_VALUES.length;

/**
 * Shift
 */
export enum ShiftKind {
  MORNING_0 = "M0",
  MORNING_1 = "M1",
  MORNING_2 = "M2",
  AFTERNOON_0 = "A0",
  AFTERNOON_1 = "A1",
  EVENING_0 = "E0",
}
export const SHIFT_VALUES = Object.values(ShiftKind);
export const NUM_SHIFTS = SHIFT_VALUES.length;

/**
 * Time
 */
export class Time {
  date: DateKind;
  shift: ShiftKind;

  constructor(date: DateKind, shift: ShiftKind) {
    this.date = date;
    this.shift = shift;
  }

  static fromString(str: string): Time {
    const [date, shift] = str.split(DELIMITER);

    assert(DATE_VALUES.includes(date as DateKind), `Invalid date: ${date}`);
    assert(SHIFT_VALUES.includes(shift as ShiftKind), `Invalid shift: ${shift}`);

    return new Time(date as DateKind, shift as ShiftKind);
  }

  toString(): string {
    return `${this.date}/${this.shift}`;
  }

  isEqual(other: Time): boolean {
    return this.date === other.date && this.shift === other.shift;
  }
}
export const TIME_VALUES = DATE_VALUES.map(date => SHIFT_VALUES.map(shift => new Time(date, shift))).flat();
