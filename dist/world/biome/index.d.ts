import type { WorldBiomeConfig } from "./types";
export declare class WorldBiome<T extends object> {
    readonly lowerBound: number;
    readonly upperBound: number;
    readonly data: T;
    constructor(config: WorldBiomeConfig, data: T);
}
