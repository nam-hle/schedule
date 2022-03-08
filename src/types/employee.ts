import { LocationKind } from "./location";
import { PositionKind } from "./position";
import { Time } from "./time";

export interface EmployeeInfo {
  readonly id: string;
  readonly name: string;
  readonly level: number;
  readonly availablePositions: PositionKind[];
}

export interface Registration {
  readonly time: Time;
  readonly preferredLocation: LocationKind[];
}

export class RegisteredEmployee {
  constructor(private info: EmployeeInfo, private registrations: Registration[]) {}

  private isAvailableAtTime(time: Time): boolean {
    return this.registrations.some(r => r.time.isEqual(time));
  }

  private isAvailableAtPosition(position: PositionKind): boolean {
    return this.info.availablePositions.includes(position);
  }

  public isAvailable(params: { time: Time; position?: PositionKind }): boolean {
    const { time, position } = params;
    return this.isAvailableAtTime(time) && (!position || this.isAvailableAtPosition(position));
  }

  public print(): void {
    console.log(`
Id: ${this.info.id}
Name: ${this.info.name}
Level: ${this.info.level}
Available Positions: ${this.info.availablePositions.join(", ")}
Registrations: \n${this.registrations.map(r => `\t - ${r.time} at ${r.preferredLocation.join(", ")}`).join("\n")}`);
  }
}
