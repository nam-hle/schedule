import { Position } from "./position";
import { Shift } from "./shift";

export interface Location {
  readonly kind: Location.Kind;
  readonly demands: Location.Demand[];
}

export namespace Location {
  export enum Kind {
    CTVT = "CTVT",
    LHP = "LHP",
    PCT = "PCT",
  }

  export const VALUES = Object.values(Kind);
  export const SIZE = VALUES.length;

  export function toString(location: Location): string {
    return `${location.kind}(${location.demands.map(Demand.toString).join(", ")})`;
  }

  export interface Demand {
    readonly shift: Shift;
    readonly position: Position;
    readonly quantity: number;
  }

  export namespace Demand {
    export function toString(demand: Demand): string {
      return `${demand.shift} ${demand.position} ${demand.quantity}`;
    }
  }
}
