import { Biome, BiomeLayer, MapParameters } from './types';
declare class GenBiome {
    /**
     * Map width.
     */
    private width;
    /**
     * Map height.
     */
    private height;
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
     *
     * @param layer - Layer data
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
     *
     * @param x - Map position X
     * @param y - Map position Y
     */
    pickBiomeAt(x: number, y: number): Biome | null;
    /**
     * Get biomes from all layers.
     */
    getBiomes(): Biome[];
    /**
     * Refresh seed for unique generation.
     */
    refreshSeed(): void;
    /**
     * Generate map layer.
     */
    private generateLayer;
}
export = GenBiome;
