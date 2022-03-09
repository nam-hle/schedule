import { Demand } from "./demand";

enum Kind {
  CTVT = "CTVT",
  LHP = "LHP",
  PCT = "PCT",
}

export class Location {
  static Kind = Kind;
  static VALUES = Object.values(Kind);
  static SIZE = Location.VALUES.length;

  constructor(public kind: Kind, public demands: Demand[] = []) {}

  toString(): string {
    return `${this.kind}(${this.demands.map(Demand.toString).join(", ")})`;
  }
}
