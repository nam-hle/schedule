import { Position } from "./position";
import { Time } from "./time";

export interface TimePosition {
  readonly time: Time;
  readonly position: Position.Kind;
}

export namespace TimePosition {
  export function isEqual(timePosition1: TimePosition, timePosition2: TimePosition): boolean {
    return timePosition1.time.isEqual(timePosition2.time) && timePosition1.position === timePosition2.position;
  }
  export function toString(time: Time, position: Position.Kind): string {
    return `${time}/${position}`;
  }

  export function fromString(timePosition: string): { time: Time; position: Position.Kind } {
    const [time, position] = timePosition.split("/");

    return { time: Time.fromString(time), position: Position.fromString(position) };
  }
}
