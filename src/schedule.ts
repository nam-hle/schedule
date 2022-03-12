import { Location, Position, Employee, Time, TimePosition } from "./entities";
import { Assignment } from "./entities/assignment";
import { Random } from "./random";

export type LocationRegistration = {
  [position: string]: Record<Position.Kind, string[]>;
};

export class Schedule {
  private data: {
    [time: string]: LocationRegistration;
  } = {};

  constructor(private registeredEmployees: Employee[], private locationInfos: Location[]) {}

  private sortTimePositionByAvailability(): TimePosition[] {
    const timePositionAvailability: [TimePosition, number][] = [];
    for (const time of Time.VALUES) {
      for (const position of Position.VALUES) {
        const timePosition: TimePosition = { time, position };
        const availability = this.registeredEmployees.filter(employee => employee.isAvailable(timePosition)).length;
        if (availability === 0) {
          continue;
        }
        timePositionAvailability.push([timePosition, availability]);
      }
    }

    return timePositionAvailability.sort((a, b) => a[1] - b[1]).map(x => x[0]);
  }

  main() {
    const timePositions = this.sortTimePositionByAvailability();
    for (const timePosition of timePositions) {
      const employees = this.registeredEmployees.filter(employee => employee.isAvailable(timePosition));
      const locations = this.locationInfos.filter(location => location.getRemainDemandAt(timePosition));
      if (employees.length === 0 || locations.length === 0) {
        continue;
      }

      const employee = Random.item(employees);
      const location = Random.item(locations);
      Schedule.link(location, employee, timePosition);
    }
  }

  static link(location: Location, employee: Employee, timePosition: TimePosition): void {
    const assignment: Assignment = {
      locationId: location.id,
      employeeId: employee.id,
      ...timePosition,
    };
    location.link(assignment);
    employee.link(assignment);
  }

  static unlink(location: Location, employee: Employee, timePosition: TimePosition): void {
    const assignment: Assignment = {
      locationId: location.id,
      employeeId: employee.id,
      ...timePosition,
    };

    location.unlink(assignment);
    employee.unlink(assignment);
  }
}
