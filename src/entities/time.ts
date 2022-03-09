import { Date } from "./date";
import { Shift } from "./shift";
import { DELIMITER } from "./utils";

export class Time {
  date: Date;
  shift: Shift;

  constructor(date: Date, shift: Shift) {
    this.date = date;
    this.shift = shift;
  }

  static VALUES = Date.VALUES.map(date => Shift.VALUES.map(shift => new Time(date, shift))).flat();

  static fromString(str: string): Time {
    const [date, shift] = str.split(DELIMITER);
    return new Time(Date.fromString(date), Shift.fromString(shift));
  }

  toString(): string {
    return `${this.date}${DELIMITER}${this.shift}`;
  }

  isEqual(other: Time): boolean {
    return this.date === other.date && this.shift === other.shift;
  }

  static compare(a: Time, b: Time): number {
    return Date.compare(a.date, b.date) || Shift.compare(a.shift, b.shift);
  }
}
