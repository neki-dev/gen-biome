import generateNoise, { DEFAULT_PERLIN_SIZE } from './perlin';
import { Biome, BiomeData, BiomeLayer, MapParameters } from './types';

export default class GenBiome {
  /**
   * Map width.
   */
  readonly width: number;

  /**
   * Map height.
   */
  readonly height: number;

  /**
   * Layers list.
   */
  private layers: BiomeLayer[];

  /**
   * Common map data.
   */
  private data: BiomeData[][] = [];

  /**
   * Perlin seed.
   */
  private seed: number[] = [];

  /**
   * Generation biome constructor.
   */
  constructor(parameters: MapParameters) {
    const {
      width, height, seed,
      layers = [],
    } = parameters;

    this.layers = layers;
    this.seed = seed || GenBiome.generateRandomSeed();

    this.width = width;
    this.height = height;
  }

  /**
   * Get random generation seed.
   */
  static generateRandomSeed(): number[] {
    const seed = [];
    for (let i = 0; i < DEFAULT_PERLIN_SIZE + 1; i++) {
      seed.push(Math.random());
    }

    return seed;
  }

  /**
   * Add new layer to map with custom generation parameters.
   */
  public addLayer(layer: BiomeLayer) {
    this.layers.push(layer);
  }

  /**
   * Remove all layers from map.
   */
  public clearLayers() {
    this.layers = [];
  }

  /**
   * Generate map for each layer and merging them.
   */
  public generate() {
    this.data = [];
    for (const layerData of this.layers) {
      const layer = this.generateLayer(layerData);
      for (let y = 0; y < layer.length; y++) {
        if (!this.data[y]) {
          this.data[y] = [];
        }
        for (let x = 0; x < layer[y].length; x++) {
          if (layer[y][x]) {
            this.data[y][x] = layer[y][x].data;
          }
        }
      }
    }
  }

  /**
   * Get map matrix.
   */
  public getMatrix<T = BiomeData>(): T[][] {
    return <T[][]> this.data;
  }

  /**
   * Get biome data at map position.
   */
  public getAt<T = BiomeData>(x: number, y: number): T {
    return <T> this.data[y]?.[x];
  }

  /**
   * Replace biome data at map position.
   */
  public setAt<T = BiomeData>(x: number, y: number, data: T) {
    if (!this.data[y]?.[x]) {
      return;
    }

    this.data[y][x] = data;
  }

  /**
   * Get current generation seed.
   */
  public getSeed(): number[] {
    return this.seed;
  }

  /**
   * Set generation seed.
   */
  public setSeed(seed: number[]) {
    this.seed = seed;
  }

  /**
   * Generate map layer.
   */
  private generateLayer(layer: BiomeLayer): Biome[][] {
    const {
      frequencyChange = 10,
      sizeDifference = 1.1,
      bordersPuriry = 10,
    } = layer.parameters;

    const frequency = Math.max(1, Math.min(64, frequencyChange));
    const octaves = 22 - Math.max(2, Math.min(20, bordersPuriry));
    const redistribution = Math.max(0.1, Math.min(3, sizeDifference));

    const map = [];
    for (let y = 0; y < this.height; y++) {
      map[y] = [];
      for (let x = 0; x < this.width; x++) {
        let cell = generateNoise({
          seed: this.seed,
          octaves,
          x: (x / this.width) * frequency,
          y: (y / this.height) * frequency,
        });
        cell **= redistribution;
        const biome = layer.biomes.find(({ breakpoint: [min, max] }) => (
          (min === undefined || cell >= min)
          && (max === undefined || cell < max)
        ));
        map[y][x] = biome || null;
      }
    }

    return map;
  }
}

export * from './types';
