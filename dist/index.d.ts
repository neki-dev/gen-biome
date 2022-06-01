import { BiomeData, BiomeLayer, MapParameters } from './types';
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
    /**
     * Generation biome constructor.
     */
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
     * Get map matrix.
     */
    getMatrix(): BiomeData[][];
    /**
     * Get biome data at map position.
     */
    getAt<T = any>(x: number, y: number): BiomeData;
    /**
     * Set new biome data at map position.
     */
    setAt(x: number, y: number, biomeData: BiomeData): void;
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
