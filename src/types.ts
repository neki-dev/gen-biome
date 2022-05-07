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

export type Biome = {
  tileIndex: number
  level: number
  collide?: boolean
  props?: {
    [key: string]: any
  }
};

export type BiomeLayer = {
  biomes: Biome[]
  parameters: LayerParameters
};

export type MapParameters = {
  width: number
  height: number
  layers?: BiomeLayer[]
};
