export type WorldGenerationParams = {
  /**
   * Generation seed
   * Default: Autogenerate
   */
  seed?: number[]

  /**
   * Size of seed array
   * Default: 512
   */
  seedSize?: number

  /**
   * Generation offset X
   * Default: 0
   */
  offsetX?: number

  /**
   * Generation offset Y
   * Default: 0
   */
  offsetY?: number
};
