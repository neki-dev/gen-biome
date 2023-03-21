import { WorldLayerParams, WorldParams } from './types';
import { World } from './world';
import { WorldLayer } from './world-layer';
export declare class WorldGenerator<T = any> {
    readonly width: number;
    readonly height: number;
    private layers;
    constructor(params: WorldParams);
    addLayer(params?: WorldLayerParams): WorldLayer<T>;
    clearLayers(): void;
    getLayers(): WorldLayer<T>[];
    generate(seed?: number[]): World<T>;
    private generateLayer;
}
