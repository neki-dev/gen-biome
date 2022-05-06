export declare type LayerParameters = {
    frequencyChange?: number;
    sizeDifference?: number;
    bordersPuriry?: number;
};
export declare type Biome = {
    tileIndex: number;
    level: number;
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
