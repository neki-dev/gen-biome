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
```js
const generator = new WorldGenerator<T>(params)
```
* `params`
* * `width` - Map width
* * `height` - Map height

.

## Layers
#### Add layer to generator
```js
const layer: WorldLayer = generator.addLayer(params?)
```
* `params`
* * `frequencyChange` - Frequency of biomes change
* * * _Default: 0.3, Min: 0.0, Max: 1.0_
* * `borderSmoothness` - Smoothness of biomes borders
* * *  _Default: 0.5, Min: 0.0, Max: 1.0_
* * `heightRedistribution` - Redistribution of biomes height
* * *  _Default: 1.0, Min: 0.5, Max: 1.5_
* * `heightAveraging` - Averaging of biomes height
* * *  _Default: true_

#### Get generator layers
```js
const layers: WorldLayers[] = generator.getLayers()
```

#### Clear all generator layers
```js
generator.clearLayers()
```

.

## Biomes
#### Add biome to layer
```js
for (const { params, data } of ...) {
  const biome: WorldBiome = layer.addBiome(params, data)
}
```
* `params`
* * `lowerBound` - Lower biome bound
* * *  _Default: 0.0_
* * `upperBound` - Upper biome bound
* * *  _Default: 1.0_
* `data` - Data of biome

#### Get layer biomes
```js
const biomes: WorldBiome[] = layer.getBiomes()
```

#### Clear all layer biomes
```js
layer.clearBiomes()
```

.

## Generation

#### Generate world
```js
const world: World = generator.generate(seed?)
```
* `seed` - Generation seed
* * *  _Default: Autogenerate_

.

## World

#### Get matrix of biomes data
```js
const matrix: T[][] = world.getMatrix()
```

#### Each all positions
```js
world.each(callback)
```
* `callback`
* * `position` - Position at matrix
* * `data` - Biome data

#### Get biome data at position
```js
const data: T = world.getAt(position)
```
* `position`
* * `x` - X position at matrix
* * `y` - Y position at matrix

#### Replace biome data at position
```js
world.replaceAt(position, data)
```
* `position`
* * `x` - X position at matrix
* * `y` - Y position at matrix

#### Get current world generation seed
```js
const seed: number[] = world.seed
```

#### Get world width
```js
const width: number = world.width
```

#### Get world height
```js
const height: number = world.height
```