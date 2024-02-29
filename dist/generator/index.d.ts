import type { WorldGenerationParams } from "./types";
import { World } from "../world";
import { WorldBiome } from "../world/biome";
import type { WorldConfig } from "../world/types";
import type { WorldBiomeConfig } from "../world/biome/types";
export declare class WorldGenerator<T extends object> {
    readonly config: WorldConfig;
    private biomes;
    constructor(config: WorldConfig);
    addBiome(config: WorldBiomeConfig, data: T): WorldBiome<T>;
    clearBiomes(): void;
    getBiomes(): WorldBiome<T>[];
    peakBiome(height: number): WorldBiome<T> | null;
    generate(params?: WorldGenerationParams): World<T>;
}
