import { BiomeData, BiomeLayer, MapParameters } from './types';
export default class GenBiome<T = BiomeData> {
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
    getMatrix(): T[][];
    /**
     * Get biome data at map position.
     */
    getAt(x: number, y: number): T;
    /**
     * Replace biome data at map position.
     */
    setAt(x: number, y: number, data: T): void;
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
