export type LayerParameters = {
    /**
     * Biome change frequency
     * Default: 10
     */
    frequencyChange?: number;
    /**
     * Biome size difference
     * Default: 1.1
     */
    sizeDifference?: number;
    /**
     * Purity of biome borders
     * Default: 10
     */
    bordersPurity?: number;
};
export type Biome<T> = {
    breakpoint: {
        min?: number;
        max?: number;
    };
    data: T;
};
export type BiomeLayer<T> = {
    biomes: Biome<T>[];
    parameters: LayerParameters;
};
export type MapParameters<T> = {
    width: number;
    height: number;
    layers?: BiomeLayer<T>[];
    seed?: number[];
};
