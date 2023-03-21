import { WorldLayerParams, WorldParams } from './types';
import { generateNoise, generateSeed } from './utils/perlin';
import { World } from './world';
import { WorldBiome } from './world-biome';
import { WorldLayer } from './world-layer';

export class WorldGenerator<T = any> {
  readonly width: number;

  readonly height: number;

  private layers: WorldLayer<T>[] = [];

  constructor(params: WorldParams) {
    this.width = params.width;
    this.height = params.height;
  }

  public addLayer(params: WorldLayerParams = {}) {
    const layer = new WorldLayer<T>(params);

    this.layers.push(layer);

    return layer;
  }

  public clearLayers() {
    this.layers = [];
  }

  public getLayers() {
    return this.layers;
  }

  public generate(seed?: number[]) {
    const currentSeed = seed ?? generateSeed();
    const matrix: T[][] = [];

    for (const layer of this.layers) {
      const layerMatrix = this.generateLayer(layer, currentSeed);

      for (let y = 0; y < this.height; y++) {
        if (!matrix[y]) {
          matrix[y] = [];
        }
        for (let x = 0; x < this.width; x++) {
          if (layerMatrix[y][x]) {
            matrix[y][x] = layerMatrix[y][x].data;
          }
        }
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (matrix[y][x] === undefined) {
          throw Error(`World matrix contains empty biome at ${x},${y}`);
        }
      }
    }

    return new World<T>(matrix, currentSeed);
  }

  private generateLayer(layer: WorldLayer<T>, seed: number[]) {
    const params = layer.getGenerationParams();
    const matrix: WorldBiome<T>[][] = [];

    for (let y = 0; y < this.height; y++) {
      matrix[y] = [];
      for (let x = 0; x < this.width; x++) {
        const height = generateNoise({
          ...params,
          seed,
          x: x / this.width,
          y: y / this.height,
        });

        const biome = layer.getBiomeByHeight(height);

        if (biome) {
          matrix[y][x] = biome;
        }
      }
    }

    return matrix;
  }
}
