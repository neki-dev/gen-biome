import { WorldBiomePosition } from './types';
export declare class World<T> {
    readonly width: number;
    readonly height: number;
    readonly seed: number[];
    private matrix;
    constructor(matrix: T[][], seed: number[]);
    getMatrix(): T[][];
    getAt(position: WorldBiomePosition): T | undefined;
    replaceAt(position: WorldBiomePosition, data: T): void;
}
