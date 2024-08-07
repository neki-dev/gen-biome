## ![Gen Biome](./docs/logotype-s.png)
[![Version](https://badgen.net/npm/v/gen-biome)](https://npmjs.com/package/gen-biome)
[![Small size](https://img.badgesize.io/neki-dev/gen-biome/master/dist/index.js)](https://github.com/neki-dev/gen-biome/blob/master/dist/index.js)
[![Build](https://github.com/neki-dev/gen-biome/actions/workflows/deploy.yml/badge.svg)](https://github.com/neki-dev/gen-biome/actions/workflows/deploy.yml)

Procedural generation of 2D maps with distinct biomes

.

[Demo](https://gen-biome.neki.guru/)

Documentation

* [Install](https://github.com/neki-dev/gen-biome?tab=readme-ov-file#install)
* [Generator](https://github.com/neki-dev/gen-biome?tab=readme-ov-file#generator)
* [Biomes](https://github.com/neki-dev/gen-biome?tab=readme-ov-file#biomes)
* [Generation](https://github.com/neki-dev/gen-biome?tab=readme-ov-file#generation)
* [World](https://github.com/neki-dev/gen-biome?tab=readme-ov-file#world)
* [Example](https://github.com/neki-dev/gen-biome?tab=readme-ov-file#example)

.

## Install

```sh
npm i gen-biome
```

.

## Generator
### Create world generator
```ts
new WorldGenerator<T>(config: WorldConfig)
```
[`config`] - _World config_

| Prop | Description | Default | Range |
| ---- | ----------- | ------- | ----- |
| width | Map width |  |  |
| height | Map height |  |  |
| frequencyChange | Frequency of biomes change | 0.3 | 0.0 - 1.0 |
| borderSmoothness | Smoothness of biomes borders | 0.5 | 0.0 - 1.0 |
| heightRedistribution | Redistribution of biomes height | 1.0 | 0.5 - 1.5 |
| heightAveraging | Averaging of biomes height | true |  |
| falloff | Scale of falloff area | 0.0 |  |

.

## Biomes
### Add biome
```ts
generator.addBiome(
  config: WorldBiomeConfig, 
  data: T,
): WorldBiome<T>
```
[`config`] - _Biome config_
 
| Prop | Description | Default |
| ---- | ----------- | ------- | 
| lowerBound | Lower biome bound | 0.0 |
| upperBound | Upper biome bound | 1.0 |

[`data`] - _Biome data that will be stored in the world matrix_

### Get current biomes
```ts
generator.getBiomes(): WorldBiome<T>[]
```

### Clear all biomes
```ts
generator.clearBiomes()
```

.

## Generation
### Generate world
```ts
generator.generate(
  params?: WorldGenerationParams,
): World<T>
```
[`params`] - _Generation params_ (optional)
 
| Prop | Description | Default |
| ---- | ----------- | ------- | 
| seed | Generation seed | (autogenerated) |
| seedSize | Size of seed array | 512 |
| offsetX | Generation offset X | 0 |
| offsetY | Generation offset Y | 0 |

.

## World
### Get matrix of biomes data
```ts
world.getMatrix(): T[][]
```

### Each all positions
```ts
world.each(
  callback: (position: WorldPoint, data: T) => void,
): void
```
[`callback`] - _Callback with position and biome stored data_

### Get biome data at position
```ts
world.getAt(
  position: WorldPoint,
): T | null
```
[`position`] - _Position at matrix_

### Replace biome data at position
```ts
world.replaceAt(
  position: WorldPoint, 
  data: T,
): void
```
[`position`] - _Position at matrix_

[`data`] - _New biome stored data_

### Get current world generation seed
```ts
world.seed: number[]
```

### Get world width
```ts
world.width: number
```

### Get world height
```ts
world.height: number
```

.

## Example

```ts
const TILE_SIZE = 2;
const BIOMES = [
  { // WATER
    params: { lowerBound: 0.0, upperBound: 0.2 },
    data: { color: 'blue' },
  },
  { // GRASS
    params: { lowerBound: 0.2, upperBound: 0.7 },
    data: { color: 'green' },
  },
  { // MOUNTS
    params: { lowerBound: 0.7 },
    data: { color: 'gray' },
  },
];

const generator = new WorldGenerator({
  width: 100,
  height: 100,
});

for (const { params, data } of BIOMES) {
  generator.addBiome(params, data);
}

const world = generator.generate();

world.each((position, biome) => {
  const tileX = position.x * TILE_SIZE;
  const tileY = position.y * TILE_SIZE;

  ctx.fillStyle = biome.color;
  ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
});
```