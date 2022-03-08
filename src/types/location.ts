import { PositionKind } from "./common";
import { Time } from "./time";

export interface LocationInfo {
  readonly kind: LocationKind;
  readonly demands: LocationDemand[];
}

export interface LocationDemand {
  readonly time: Time;
  readonly position: PositionKind;
  readonly quantity: number;
}

export enum LocationKind {
  CTVT,
  LHP,
  PCT,
}
export const LOCATION_VALUES = Object.values(LocationKind);
export const NUM_LOCATIONS = LOCATION_VALUES.length;
