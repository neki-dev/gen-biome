import { WorldLayerParams } from './types';
import { WorldBiome } from './world-biome';
export declare class WorldLayer<T = any> {
    private readonly frequency;
    private readonly octaves;
    private readonly redistribution;
    private biomes;
    constructor(params?: WorldLayerParams);
    addBiome(biome: WorldBiome<T>): void;
    clearBiomes(): void;
    getBiomes(): WorldBiome<T>[];
    getBiomeByHeight(height: number): WorldBiome<T> | undefined;
    getGenerationParams(): {
        frequency: number;
        octaves: number;
        redistribution: number;
    };
}
