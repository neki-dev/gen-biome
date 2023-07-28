import { WorldLayerParams } from '../types';
type NoiseParameters = {
    seed: number[];
    x: number;
    y: number;
    width: number;
    height: number;
    params: WorldLayerParams;
};
export declare function generateNoise(parameters: NoiseParameters): number;
export {};
