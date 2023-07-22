import { WorldBiomePosition } from './types';

export class World<T> {
  public readonly width: number;

  public readonly height: number;

  public readonly seed: number[];

  private matrix: T[][] = [];

  constructor(matrix: T[][], seed: number[]) {
    this.width = matrix[0].length;
    this.height = matrix.length;
    this.matrix = matrix;
    this.seed = seed;
  }

  public getMatrix(): T[][] {
    return this.matrix;
  }

  public each(callback: (position: WorldBiomePosition, biome: T) => boolean | void) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const res = callback({ x, y }, this.matrix[y][x]);

        if (res === false) {
          return;
        }
      }
    }
  }

  public getAt(position: WorldBiomePosition): T | null {
    return this.matrix[position.y]?.[position.x] ?? null;
  }

  public replaceAt(position: WorldBiomePosition, data: T) {
    if (position.y >= this.height || position.x >= this.width) {
      throw Error(`Position [${position.x},${position.y}] is out of world bounds`);
    }

    this.matrix[position.y][position.x] = data;
  }
}
