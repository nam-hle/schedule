export enum DateKind {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}
export const DATE_VALUES = Object.values(DateKind);
export const NUM_DATES = DATE_VALUES.length;

export enum ShiftKind {
  MORNING = "morning",
  AFTERNOON = "afternoon",
  EVENING = "evening",
}
export const SHIFT_VALUES = Object.values(ShiftKind);
export const NUM_SHIFTS = SHIFT_VALUES.length;

export interface Time {
  date: DateKind;
  shift: ShiftKind;
}

export namespace Time {
  export function isValid(time: Time): boolean {
    return DATE_VALUES.includes(time.date) && SHIFT_VALUES.includes(time.shift);
  }

  export function create(date: DateKind, shift: ShiftKind): Time {
    return { date, shift };
  }
}
