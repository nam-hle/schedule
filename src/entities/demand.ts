import { Random } from "../random";

import { Position } from "./position";
import { Shift } from "./shift";

export interface Demand {
  readonly shift: Shift;
  readonly position: Position;
  readonly quantity: number;
}

export namespace Demand {
  export function toString(demand: Demand): string {
    return `${demand.shift} ${demand.position} ${demand.quantity}`;
  }

  export function seed(): Demand {
    return {
      shift: Shift.seed(),
      position: Position.seed(),
      quantity: Random.int(3),
    };
  }
}
