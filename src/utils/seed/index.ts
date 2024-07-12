export class Seed {
  public static generate(size: number = 512) {
    const seed: number[] = [];
  
    for (let i = 0; i < size; i++) {
      seed.push(Math.random());
    }
  
    return seed;
  }
}