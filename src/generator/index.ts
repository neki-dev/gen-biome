import type { WorldGenerationParams } from "./types";
import { Perlin } from "../utils/perlin";
import { Seed } from "../utils/seed";
import { World } from "../world";
import { WorldBiome } from "../world/biome";
import type { WorldConfig } from "../world/types";
import type { WorldBiomeConfig } from "../world/biome/types";

export class WorldGenerator<T extends object> {
  readonly config: WorldConfig;

  private biomes: WorldBiome<T>[] = [];

  constructor(config: WorldConfig) {
    this.config = config;
  }

  public addBiome(config: WorldBiomeConfig, data: T): WorldBiome<T> {
    const biome = new WorldBiome<T>(config, data);
    this.biomes.push(biome);

    return biome;
  }

  public clearBiomes(): void {
    this.biomes = [];
  }

  public getBiomes(): WorldBiome<T>[] {
    return this.biomes;
  }

  public peakBiome(height: number): WorldBiome<T> | null {
    return this.getBiomes().find((biome) => (
      height >= biome.lowerBound && height <= biome.upperBound
    )) ?? null;
  }

  public generate(params?: WorldGenerationParams): World<T> {
    const currentSeed = params?.seed ?? Seed.generate(params?.seedSize);
    const matrix: T[][] = [];

    for (let y = 0; y < this.config.height; y++) {
      matrix[y] = [];
      for (let x = 0; x < this.config.width; x++) {
        const height = Perlin.generate({
          config: this.config,
          seed: currentSeed,
          x: x + (params?.offsetX ?? 0),
          y: y + (params?.offsetY ?? 0),
        });

        const biome = this.peakBiome(height);
        if (biome) {
          matrix[y][x] = biome.data;
        }
      }
    }

    return new World<T>(matrix, currentSeed);
  }
}
