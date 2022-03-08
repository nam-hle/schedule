import { PositionKind } from "./position";
import { ShiftKind } from "./time";

export interface LocationInfo {
  readonly kind: LocationKind;
  readonly demands: LocationDemand[];
}

export namespace LocationInfo {
  export function toString(locationInfo: LocationInfo): string {
    return `${locationInfo.kind}(${locationInfo.demands.map(LocationDemand.toString).join(", ")})`;
  }
}

export interface LocationDemand {
  readonly shift: ShiftKind;
  readonly position: PositionKind;
  readonly quantity: number;
}

export namespace LocationDemand {
  export function toString(locationDemand: LocationDemand): string {
    return `${locationDemand.shift} ${locationDemand.position} ${locationDemand.quantity}`;
  }
}

export enum LocationKind {
  CTVT = "CTVT",
  LHP = "LHP",
  PCT = "PCT",
}

export const LOCATION_VALUES = Object.values(LocationKind);
export const NUM_LOCATIONS = LOCATION_VALUES.length;
