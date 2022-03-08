import { RegisteredEmployee } from "./types";
import { LocationInfo } from "./types/location";
import { POSITION_VALUES, PositionKind } from "./types/position";
import { Time, TIME_VALUES } from "./types/time";
import { TimePosition } from "./types/time-position";

export type LocationRegistration = {
  [position: string]: Record<PositionKind, string[]>;
};

export class Schedule {
  private data: {
    [time: string]: LocationRegistration;
  } = {};

  private timeAvailability: Map<Time, RegisteredEmployee[]>;
  private timePositionAvailability: Map<string, RegisteredEmployee[]>;

  constructor(private registeredEmployees: RegisteredEmployee[], private locationInfos: LocationInfo[]) {
    this.timeAvailability = this.calculateTimeAvailability();
    this.timePositionAvailability = this.calculateTimePositionAvailability();
  }

  private calculateTimeAvailability(): Map<Time, RegisteredEmployee[]> {
    const res = new Map<Time, RegisteredEmployee[]>();
    for (const time of TIME_VALUES) {
      const employees = this.registeredEmployees.filter(employee => employee.isAvailable({ time }));
      res.set(time, employees);
    }
    return res;
  }

  private calculateTimePositionAvailability(): Map<string, RegisteredEmployee[]> {
    const res = new Map<string, RegisteredEmployee[]>();
    for (const time of TIME_VALUES) {
      for (const position of POSITION_VALUES) {
        const employees = this.registeredEmployees.filter(employee => employee.isAvailable({ time, position }));
        res.set(TimePosition.toString(time, position), employees);
      }
    }
    return res;
  }
}
