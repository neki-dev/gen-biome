import { WorldBiomeParams } from './types';
export declare class WorldBiome<T> {
    readonly lowerBound: number;
    readonly upperBound: number;
    readonly data: T;
    constructor(params: WorldBiomeParams, data: T);
}
