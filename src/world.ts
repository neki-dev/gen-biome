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

  public getAt(position: WorldBiomePosition): T | undefined {
    return this.matrix[position.y]?.[position.x];
  }

  public replaceAt(position: WorldBiomePosition, data: T) {
    if (position.y >= this.height || position.x >= this.width) {
      throw Error('Specified position is out of world bounds');
    }

    this.matrix[position.y][position.x] = data;
  }
}
