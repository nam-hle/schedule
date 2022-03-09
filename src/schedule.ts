import { Location, Position, RegisteredEmployee, Time, TimePosition } from "./entities";

export type LocationRegistration = {
  [position: string]: Record<Position.Kind, string[]>;
};

export class Schedule {
  private data: {
    [time: string]: LocationRegistration;
  } = {};

  private timeAvailability: Map<Time, RegisteredEmployee[]>;
  private timePositionAvailability: Map<string, RegisteredEmployee[]>;

  constructor(private registeredEmployees: RegisteredEmployee[], private locationInfos: Location[]) {
    this.timeAvailability = this.calculateTimeAvailability();
    this.timePositionAvailability = this.calculateTimePositionAvailability();
  }

  private calculateTimeAvailability(): Map<Time, RegisteredEmployee[]> {
    const res = new Map<Time, RegisteredEmployee[]>();
    for (const time of Time.VALUES) {
      const employees = this.registeredEmployees.filter(employee => employee.isAvailable({ time }));
      res.set(time, employees);
    }
    return res;
  }

  private calculateTimePositionAvailability(): Map<string, RegisteredEmployee[]> {
    const res = new Map<string, RegisteredEmployee[]>();
    for (const time of Time.VALUES) {
      for (const position of Position.VALUES) {
        const employees = this.registeredEmployees.filter(employee => employee.isAvailable({ time, position }));
        res.set(TimePosition.toString(time, position), employees);
      }
    }
    return res;
  }
}
