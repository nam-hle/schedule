import { Location } from "./location";
import { Position } from "./position";
import { Time } from "./time";

export interface EmployeeInfo {
  readonly id: string;
  readonly name: string;
  readonly level: number;
  readonly availablePositions: Position.Kind[];
}

export interface Registration {
  readonly time: Time;
  readonly preferredLocation: Location.Kind[];
}

export class RegisteredEmployee {
  constructor(private info: EmployeeInfo, private registrations: Registration[]) {}

  public isAvailable(params: { time: Time; position?: Position.Kind }): boolean {
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

  private isAvailableAtTime(time: Time): boolean {
    return this.registrations.some(r => r.time.isEqual(time));
  }

  private isAvailableAtPosition(position: Position.Kind): boolean {
    return this.info.availablePositions.includes(position);
  }
}
