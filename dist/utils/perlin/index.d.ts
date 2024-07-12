import type { PerlinParameters } from "./types";
export declare class Perlin {
    static generate({ x, y, seed, config }: PerlinParameters): number;
    private static clamp;
    private static scaledCosine;
    private static smootherStep;
    private static heightFalloff;
    private static normalizeConfig;
}
