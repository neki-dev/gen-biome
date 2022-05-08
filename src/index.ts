import generateNoise, { DEFAULT_PERLIN_SIZE } from './perlin';
import { Biome, BiomeLayer, MapParameters } from './types';

class GenBiome {
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

    this.refreshSeed();
  }

  /**
   * Add new layer to map with custom generation parameters.
   */
  public addLayer(layer: BiomeLayer) {
    this.layers.push(layer);
  }

  /**
   * Generate map for each layer and merging them.
   */
  public generate() {
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
    if (this.data.length === 0) {
      throw Error('Map not generated. First use `generate()`');
    }

    return this.data.map((y) => (
      y.map((x) => x.tileIndex)
    ));
  }

  /**
   * Convert map data to array of collide areas.
   */
  public getCollideMatrix(): (1 | 0)[][] {
    if (this.data.length === 0) {
      throw Error('Map not generated. First use `generate()`');
    }

    return this.data.map((y) => (
      y.map((x) => (x.collide ? 1 : 0))
    ));
  }

  /**
   * Get biom data at map position.
   */
  public pickBiomeAt(x: number, y: number): Biome | null {
    if (this.data.length === 0) {
      throw Error('Map not generated. First use `generate()`');
    }

    return this.data[y]?.[x] || null;
  }

  /**
   * Get biomes from all layers.
   */
  public getBiomes(): Biome[] {
    return this.layers.map((layer) => layer.biomes).flat();
  }

  /**
   * Refresh to random or custom seed.
   */
  public refreshSeed(seed: number[] = null) {
    if (seed) {
      this.seed = seed;
    } else {
      this.seed = [];
      for (let i = 0; i < DEFAULT_PERLIN_SIZE + 1; i++) {
        this.seed.push(Math.random());
      }
    }
  }

  /**
   * Get generation seed.
   */
  public getSeed(): number[] {
    return this.seed;
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
        const biome = layer.biomes.find(({ level }) => {
          const [min, max] = level;
          return (
            (min === undefined || cell >= min)
            && (max === undefined || cell < max)
          );
        });
        map[y][x] = biome || null;
      }
    }

    return map;
  }
}

export { Biome, BiomeLayer } from './types';

// export for commonjs
// @ts-ignore
export = GenBiome;
