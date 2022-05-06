import generateNoise, { PERLIN_SIZE } from './perlin';
import { Biome, BiomeLayer, MapParameters } from './types';

class GenBiome {
  /**
   * Map width.
   */
  private width: number;

  /**
   * Map height.
   */
  private height: number;

  /**
   * Layers list.
   */
  private layers: BiomeLayer[];

  /**
   * Common map data.
   */
  public data: Biome[][] = [];

  /**
   * Perlin seed.
   */
  private seed: number[] = [];

  constructor(parameters: MapParameters) {
    const { width, height, layers = [] } = parameters;

    this.width = width;
    this.height = height;
    this.layers = layers;
  }

  /**
   * Add new layer to map with custom generation parameters.
   *
   * @param layer - Layer data
   */
  public addLayer(layer: BiomeLayer) {
    this.layers.push(layer);
  }

  /**
   * Generate map for each layer and merging them.
   */
  public generate() {
    if (this.seed.length === 0) {
      this.refreshSeed();
    }

    this.data = [];
    for (const layer of this.layers) {
      const layerData = this.generateLayer(layer);
      for (let y = 0; y < layerData.length; y++) {
        for (let x = 0; x < layerData[y].length; x++) {
          if (layerData[y][x] !== null) {
            if (!this.data[y]) {
              this.data[y] = [];
            }
            this.data[y][x] = layerData[y][x];
          }
        }
      }
    }
  }

  /**
   * Convert map data to array of tiles indexes.
   */
  public getTilesMatrix(): number[][] {
    return this.data.map((y) => (
      y.map((x) => x.tileIndex)
    ));
  }

  /**
   * Convert map data to array of collide areas.
   */
  public getCollideMatrix(): (1 | 0)[][] {
    return this.data.map((y) => (
      y.map((x) => (x.collide ? 1 : 0))
    ));
  }

  /**
   * Get biom data at map position.
   *
   * @param x - Map position X
   * @param y - Map position Y
   */
  public pickBiomeAt(x: number, y: number): Biome | null {
    return this.data[y]?.[x] || null;
  }

  /**
   * Get biomes from all layers.
   */
  public getBiomes(): Biome[] {
    return this.layers.map((layer) => layer.biomes).flat();
  }

  /**
   * Refresh seed for unique generation.
   */
  public refreshSeed() {
    this.seed = [];
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      this.seed.push(Math.random());
    }
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

    const frequency = Math.max(1, Math.min(100, frequencyChange));
    const octaves = 24 - Math.max(4, Math.min(20, bordersPuriry));
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
        const biome = layer.biomes.find(({ level }) => (cell <= level));
        map[y][x] = biome || null;
      }
    }

    return map;
  }
}

// export for commonjs
// @ts-ignore
export = GenBiome;
