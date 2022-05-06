export type LayerParameters = {
  // Biome change frequency
  frequencyChange?: number
  // Biome size difference
  sizeDifference?: number
  // Purity of biome borders
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
