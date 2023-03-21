import { WorldBiomePosition } from './types';
export declare class World<T = any> {
    readonly width: number;
    readonly height: number;
    readonly seed: number[];
    private matrix;
    constructor(matrix: T[][], seed: number[]);
    getMatrix(): T[][];
    getAt(position: WorldBiomePosition): T | undefined;
    replaceAt(position: WorldBiomePosition, data: T): void;
    getSeed(): number[];
}
