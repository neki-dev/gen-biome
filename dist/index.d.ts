export declare type Biome = {
    tileIndex: number;
    level: number;
};
declare type GenerationParameters = {
    width: number;
    height: number;
    frequency?: number;
    redistribution?: number;
    octaves?: number;
    ampFalloff?: number;
    fillEmpty?: number | null;
};
/**
 * Generation random map with bioms
 * Return 2D matrix (number[][])
 *
 * @param {Biome[]} biomes - List of biomes parameters
 * @param {GenerationParameters} parameters - Generation parameters
 *
 * @returns {Tilemap}
 */
declare function generateMap(bioms: Biome[], parameters: GenerationParameters): number[][];
export = generateMap;
