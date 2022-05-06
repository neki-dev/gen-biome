declare type NoiseParameters = {
    x: number;
    y: number;
    octaves: number;
    seed: number[];
};
export declare const PERLIN_SIZE = 4095;
export default function generateNoise(parameters: NoiseParameters): number;
export {};
