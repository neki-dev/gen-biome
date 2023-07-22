type NoiseParameters = {
    seed: number[];
    x: number;
    y: number;
    width: number;
    height: number;
    frequency: number;
    redistribution: number;
    octaves: number;
    averaging: boolean;
    falloff?: number;
};
export declare function generateSeed(): number[];
export declare function generateNoise(parameters: NoiseParameters): number;
export {};
