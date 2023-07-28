import { WorldBiomeParams, WorldLayerParams } from './types';
import { WorldBiome } from './world-biome';
export declare class WorldLayer<T> {
    readonly params: WorldLayerParams;
    private biomes;
    constructor(params?: WorldLayerParams);
    addBiome(params: WorldBiomeParams, data: T): WorldBiome<T>;
    clearBiomes(): void;
    getBiomes(): WorldBiome<T>[];
    getBiomeByHeight(height: number): WorldBiome<T> | undefined;
}
