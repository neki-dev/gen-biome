import type { WorldPoint } from "./types";

export class World<T extends object> {
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

  public each(callback: (point: WorldPoint, biome: T) => boolean | void): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const res = callback({ x, y }, this.matrix[y][x]);
        if (res === false) {
          return;
        }
      }
    }
  }

  public getAt(point: WorldPoint): T | null {
    return this.matrix[point.y]?.[point.x] ?? null;
  }

  public replaceAt(point: WorldPoint, data: T): void {
    this.matrix[point.y][point.x] = data;
  }
}
