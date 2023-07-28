import { WorldBiomeParams, WorldLayerParams } from './types';
import { WorldBiome } from './world-biome';

export class WorldLayer<T> {
  readonly params: WorldLayerParams;

  private biomes: WorldBiome<T>[] = [];

  constructor(params: WorldLayerParams = {}) {
    this.params = params;
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
}
