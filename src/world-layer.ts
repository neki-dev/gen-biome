import { WorldBiomeParams, WorldLayerParams } from './types';
import { clamp } from './utils/clamp';
import { WorldBiome } from './world-biome';

export class WorldLayer<T> {
  private readonly frequency: number;

  private readonly octaves: number;

  private readonly redistribution: number;

  private biomes: WorldBiome<T>[] = [];

  constructor(params: WorldLayerParams = {}) {
    this.frequency = Math.round(clamp(params?.frequencyChange, 0.3) * 31 + 1);
    this.octaves = Math.round((1 - clamp(params?.borderSmoothness, 0.5)) * 14 + 1);
    this.redistribution = 2.0 - clamp(params?.heightRedistribution, 1.0, [0.5, 1.5]);
  }

  public addBiome(params: WorldBiomeParams, data: T) {
    const biome = new WorldBiome<T>(params, data);

    this.biomes.push(biome);

    return biome;
  }

  public clearBiomes() {
    this.biomes = [];
  }

  public getBiomes() {
    return this.biomes;
  }

  public getBiomeByHeight(height: number) {
    return this.getBiomes().find((biome) => (
      height >= biome.lowerBound && height <= biome.upperBound
    ));
  }

  public getGenerationParams() {
    return {
      frequency: this.frequency,
      octaves: this.octaves,
      redistribution: this.redistribution,
    };
  }
}
