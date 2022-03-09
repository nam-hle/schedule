import { Demand } from "./demand";

export enum LocationKind {
  CTVT = "CTVT",
  LHP = "LHP",
  PCT = "PCT",
}

export class Location {
  static VALUES = Object.values(LocationKind);
  static SIZE = Location.VALUES.length;

  constructor(public kind: LocationKind, public demands: Demand[] = []) {}

  toString(): string {
    return `${this.kind}(${this.demands.map(Demand.toString).join(", ")})`;
  }
}
