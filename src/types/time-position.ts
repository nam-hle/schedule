import { Position, PositionKind } from "./position";
import { Time } from "./time";

export interface TimePosition {
  readonly time: Time;
  readonly position: PositionKind;
}
export namespace TimePosition {
  export function toString(time: Time, position: PositionKind): string {
    return `${time}/${position}`;
  }

  export function fromString(timePosition: string): { time: Time; position: PositionKind } {
    const [time, position] = timePosition.split("/");

    return { time: Time.fromString(time), position: Position.fromString(position) };
  }
}
