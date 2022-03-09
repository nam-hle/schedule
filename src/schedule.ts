import { Location, Position, Employee, Time, TimePosition } from "./entities";

export type LocationRegistration = {
  [position: string]: Record<Position.Kind, string[]>;
};

export class Schedule {
  private data: {
    [time: string]: LocationRegistration;
  } = {};

  private timeAvailability: Map<Time, Employee[]>;
  private timePositionAvailability: Map<string, Employee[]>;

  constructor(private registeredEmployees: Employee[], private locationInfos: Location[]) {
    this.timeAvailability = this.calculateTimeAvailability();
    this.timePositionAvailability = this.calculateTimePositionAvailability();
  }

  private calculateTimeAvailability(): Map<Time, Employee[]> {
    const res = new Map<Time, Employee[]>();
    for (const time of Time.VALUES) {
      const employees = this.registeredEmployees.filter(employee => employee.isAvailable({ time }));
      res.set(time, employees);
    }
    return res;
  }

  private calculateTimePositionAvailability(): Map<string, Employee[]> {
    const res = new Map<string, Employee[]>();
    for (const time of Time.VALUES) {
      for (const position of Position.VALUES) {
        const employees = this.registeredEmployees.filter(employee => employee.isAvailable({ time, position }));
        res.set(TimePosition.toString(time, position), employees);
      }
    }
    return res;
  }
}
