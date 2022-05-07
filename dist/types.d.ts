export declare type LayerParameters = {
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
    bordersPuriry?: number;
};
export declare type Biome = {
    tileIndex: number;
    level: [number, number];
    collide?: boolean;
    props?: {
        [key: string]: any;
    };
};
export declare type BiomeLayer = {
    biomes: Biome[];
    parameters: LayerParameters;
};
export declare type MapParameters = {
    width: number;
    height: number;
    layers?: BiomeLayer[];
};
