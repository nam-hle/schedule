import { Time } from "./time";

export interface Registration {
  readonly time: Time;
  readonly storeIds: string[];
}
