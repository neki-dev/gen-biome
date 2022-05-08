import { Biome, BiomeLayer, MapParameters } from './types';
declare class GenBiome {
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
    private layers;
    /**
     * Common map data.
     */
    data: Biome[][];
    /**
     * Perlin seed.
     */
    private seed;
    constructor(parameters: MapParameters);
    /**
     * Add new layer to map with custom generation parameters.
     */
    addLayer(layer: BiomeLayer): void;
    /**
     * Generate map for each layer and merging them.
     */
    generate(): void;
    /**
     * Convert map data to array of tiles indexes.
     */
    getTilesMatrix(): number[][];
    /**
     * Convert map data to array of collide areas.
     */
    getCollideMatrix(): (1 | 0)[][];
    /**
     * Get biom data at map position.
     */
    pickBiomeAt(x: number, y: number): Biome | null;
    /**
     * Get biomes from all layers.
     */
    getBiomes(): Biome[];
    /**
     * Refresh to random or custom seed.
     */
    refreshSeed(seed?: number[]): void;
    /**
     * Get generation seed.
     */
    getSeed(): number[];
    /**
     * Generate map layer.
     */
    private generateLayer;
}
export { Biome, BiomeLayer } from './types';
export = GenBiome;
