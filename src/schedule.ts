import { Store, Position, Employee, Time, TimePosition } from "./entities";
import { Assignment } from "./entities/assignment";
import { Random } from "./random";

export type StoreRegistration = {
  [position: string]: Record<Position.Kind, string[]>;
};

export class Schedule {
  private data: {
    [time: string]: StoreRegistration;
  } = {};

  constructor(private registeredEmployees: Employee[], private storeInfos: Store[]) {}

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
      const stores = this.storeInfos.filter(store => store.getRemainDemandAt(timePosition));
      if (employees.length === 0 || stores.length === 0) {
        continue;
      }

      const employee = Random.item(employees);
      const store = Random.item(stores);
      Schedule.link(store, employee, timePosition);
    }
  }

  static link(store: Store, employee: Employee, timePosition: TimePosition): void {
    const assignment: Assignment = {
      storeId: store.id,
      employeeId: employee.id,
      ...timePosition,
    };
    store.link(assignment);
    employee.link(assignment);
  }

  static unlink(store: Store, employee: Employee, timePosition: TimePosition): void {
    const assignment: Assignment = {
      storeId: store.id,
      employeeId: employee.id,
      ...timePosition,
    };

    store.unlink(assignment);
    employee.unlink(assignment);
  }
}
