import { WorldBiomePosition } from './types';
export declare class World<T> {
    readonly width: number;
    readonly height: number;
    readonly seed: number[];
    private matrix;
    constructor(matrix: T[][], seed: number[]);
    getMatrix(): T[][];
    each(callback: (position: WorldBiomePosition, biome: T) => boolean | void): void;
    getAt(position: WorldBiomePosition): T | null;
    replaceAt(position: WorldBiomePosition, data: T): void;
}
