import type { WorldPoint } from "./types";
export declare class World<T extends object> {
    readonly width: number;
    readonly height: number;
    readonly seed: number[];
    private matrix;
    constructor(matrix: T[][], seed: number[]);
    getMatrix(): T[][];
    each(callback: (point: WorldPoint, biome: T) => boolean | void): void;
    getAt(point: WorldPoint): T | null;
    replaceAt(point: WorldPoint, data: T): void;
}
