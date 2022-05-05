export declare type Biom = {
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
    regenerateSeed?: boolean;
    fillEmpty?: number | null;
};
/**
 * Generation random map with bioms
 * Return 2D matrix (number[][])
 *
 * @param {Biom[]} bioms - List of bioms parameters
 * @param {GenerationParameters} parameters - Generation parameters
 *
 * @returns {Tilemap}
 */
declare function generateMap(bioms: Biom[], parameters: GenerationParameters): number[][];
export = generateMap;
