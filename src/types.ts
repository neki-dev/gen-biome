export type LayerParameters = {
  /**
   * Biome change frequency
   * Default: 10
   */
  frequencyChange?: number

  /**
   * Biome size difference
   * Default: 1.1
   */
  sizeDifference?: number

  /**
   * Purity of biome borders
   * Default: 10
   */
  bordersPuriry?: number
};

export type BiomeData = {
  [key: string]: any
};

export type Biome = {
  breakpoint: [number, number?]
  data: BiomeData
};

export type BiomeLayer = {
  biomes: Biome[]
  parameters: LayerParameters
};

export type MapParameters = {
  width: number
  height: number
  layers?: BiomeLayer[]
  seed?: number[]
};
