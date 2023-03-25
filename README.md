## ![Gen Biome](./docs/logotype-s.png)
[![Npm package version](https://badgen.net/npm/v/gen-biome)](https://npmjs.com/package/gen-biome)
[![Small size](https://img.badgesize.io/neki-dev/gen-biome/master/dist/index.js)](https://github.com/neki-dev/gen-biome/blob/master/dist/index.js)
[![Building](https://github.com/neki-dev/gen-biome/actions/workflows/build.yml/badge.svg)](https://github.com/neki-dev/gen-biome/actions/workflows/build.yml)

Procedural generation 2D map with biomes

.

* ### [Demo](https://gen-biome.neki.guru/)

* ### Install

```sh
npm i gen-biome
```

.

## Generator
#### Create world generator
```ts
const generator = new WorldGenerator<T>(params)
```
* `params {`
* * `width` - Map width
* * `height` - Map height
* `}`

.

## Layers
#### Add layer to generator
```ts
const layer: WorldLayer = generator.addLayer(params?)
```
* `params {`
* * `frequencyChange` - Frequency of biomes change
* * * _Default: 0.3, Min: 0.0, Max: 1.0_
* * `borderSmoothness` - Smoothness of biomes borders
* * *  _Default: 0.5, Min: 0.0, Max: 1.0_
* * `heightRedistribution` - Redistribution of biomes height
* * *  _Default: 1.0, Min: 0.5, Max: 1.5_
* * `heightAveraging` - Averaging of biomes height
* * *  _Default: true_
* `}`

#### Get generator layers
```ts
const layers: WorldLayers[] = generator.getLayers()
```

#### Clear all generator layers
```ts
generator.clearLayers()
```

.

## Biomes
#### Add biome to layer
```ts
for (const { params, data } of ...) {
  const biome: WorldBiome = layer.addBiome(params, data)
}
```
* `params {`
* * `lowerBound` - Lower biome bound
* * *  _Default: 0.0_
* * `upperBound` - Upper biome bound
* * *  _Default: 1.0_
* `}`
* `data` - Data of biome

#### Get layer biomes
```ts
const biomes: WorldBiome[] = layer.getBiomes()
```

#### Clear all layer biomes
```ts
layer.clearBiomes()
```

.

## Generation

#### Generate world
```ts
const world: World = generator.generate(seed?)
```
* `seed` - Generation seed
* * *  _Default: Autogenerate_

.

## World

#### Get matrix of biomes data
```ts
const matrix: T[][] = world.getMatrix()
```

#### Each all positions
```ts
world.each(callback)
```
* `callback(`
* * `position` - Position at matrix
* * `data` - Biome data
* `)`

#### Get biome data at position
```ts
const data: T = world.getAt(position)
```
* `position {`
* * `x` - X position at matrix
* * `y` - Y position at matrix
* `}`

#### Replace biome data at position
```ts
world.replaceAt(position, data)
```
* `position {`
* * `x` - X position at matrix
* * `y` - Y position at matrix
* `}`
* `data` - New data of biome

#### Get current world generation seed
```ts
const seed: number[] = world.seed
```

#### Get world width
```ts
const width: number = world.width
```

#### Get world height
```ts
const height: number = world.height
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

const layer = generator.addLayer();

for (const { params, data } of BIOMES) {
  layer.addBiome(params, data);
}

const world = generator.generate();

world.each((position, biome) => {
  const tileX = position.x * TILE_SIZE;
  const tileY = position.y * TILE_SIZE;

  ctx.fillStyle = biome.color;
  ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
});
```