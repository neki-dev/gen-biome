import { WorldBiomeParams } from './types';

export class WorldBiome<T> {
  public readonly lowerBound: number;

  public readonly upperBound: number;

  public readonly data: T;

  constructor(params: WorldBiomeParams, data: T) {
    this.lowerBound = Math.max(0, params.lowerBound ?? 0);
    this.upperBound = Math.min(1, params.upperBound ?? 1);
    this.data = data;
  }
}
