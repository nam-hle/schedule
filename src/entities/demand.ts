import { Random } from "../random";

import { Position } from "./position";
import { Time } from "./time";
import { TimePosition } from "./time-position";

export interface Demand extends TimePosition {
  readonly quantity: number;
}

export namespace Demand {
  export function isEqual(demand: Demand, timePosition: TimePosition): boolean {
    return TimePosition.isEqual(demand, timePosition);
  }

  export function seed(): Demand {
    return {
      time: Time.seed(),
      position: Position.seed(),
      quantity: Random.int(0, 3),
    };
  }
}
