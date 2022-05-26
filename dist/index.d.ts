import { Biome, BiomeLayer, MapParameters } from './types';
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
    private layers;
    /**
     * Common map data.
     */
    private data;
    /**
     * Perlin seed.
     */
    private seed;
    constructor(parameters: MapParameters);
    /**
     * Get random generation seed.
     */
    static generateRandomSeed(): number[];
    /**
     * Add new layer to map with custom generation parameters.
     */
    addLayer(layer: BiomeLayer): void;
    /**
     * Remove all layers from map.
     */
    clearLayers(): void;
    /**
     * Generate map for each layer and merging them.
     */
    generate(): void;
    /**
     * Get common map data.
     */
    getData(): Biome[][];
    /**
     * Set common map data.
     */
    setData(data: Biome[][]): void;
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
    getBiomeAt(x: number, y: number): Biome | null;
    /**
     * Set new biom data at map position.
     */
    setBiomeAt(x: number, y: number, biome: Biome): void;
    /**
     * Get biomes from all layers.
     */
    getBiomes(): Biome[];
    /**
     * Get current generation seed.
     */
    getSeed(): number[];
    /**
     * Set generation seed.
     */
    setSeed(seed: number[]): void;
    /**
     * Generate map layer.
     */
    private generateLayer;
}
export * from './types';
