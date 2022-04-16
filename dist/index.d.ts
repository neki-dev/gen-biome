export declare type Biom = {
    tileIndex: number;
    level: number;
};
export declare type Tilemap = number[][];
declare type GenerationParameters = {
    width: number;
    height: number;
    frequency?: number;
    redistribution?: number;
    bioms: Biom[];
    octaves?: number;
    ampFalloff?: number;
    seed?: number[];
    regenerateSeed?: boolean;
};
/**
 * Generation random map with bioms
 * Return 2D matrix (number[][])
 *
 * @param {GenerationParameters} parameters - Generation parameters
 *
 * @returns {Tilemap}
 */
declare function generateMap(parameters: GenerationParameters): Tilemap;
export = generateMap;
