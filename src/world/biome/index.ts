import type { WorldBiomeConfig } from "./types";

export class WorldBiome<T extends object> {
  public readonly lowerBound: number;

  public readonly upperBound: number;

  public readonly data: T;

  constructor(config: WorldBiomeConfig, data: T) {
    this.lowerBound = Math.max(0, config.lowerBound ?? 0);
    this.upperBound = Math.min(1, config.upperBound ?? 1);
    this.data = data;
  }
}
