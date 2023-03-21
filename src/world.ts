import { WorldBiomePosition } from './types';

export class World<T = any> {
  readonly width: number;

  readonly height: number;

  readonly seed: number[];

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
    if (position.y >= this.height || position.x > this.width) {
      throw Error('Указанная позиция биома выходит за границы мира');
    }

    this.matrix[position.y][position.x] = data;
  }

  public getSeed() {
    return this.seed;
  }
}
