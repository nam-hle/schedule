import { PositionKind } from "./common";
import { LocationKind } from "./location";
import { Time } from "./time";

export interface EmployeeInfo {
  readonly id: string;
  readonly name: string;
  readonly registrations: Registration[];
}

export interface Registration {
  readonly time: Time[];
  readonly locations: LocationKind[];
  readonly positions: PositionKind[];
}
