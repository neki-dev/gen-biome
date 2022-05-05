## Biome generator
[![Npm package version](https://badgen.net/npm/v/gen-biome)](https://npmjs.com/package/gen-biome)
[![Small size](https://badge-size.herokuapp.com/neki-dev/gen-biome/master/dist/index.js)](https://github.com/neki-dev/gen-biome/blob/master/dist/index.js)
[![Building](https://github.com/neki-dev/gen-biome/actions/workflows/npm.yml/badge.svg)](https://github.com/neki-dev/gen-biome/actions)

Generation random map with biomes

Example 1 | Example 2 | Example 3
--|---|--
![Example 3](./docs/example-3.png) | ![Example 1](./docs/example-1.png) | ![Example 2](./docs/example-2.png)

.

* ### Install

```sh
npm i gen-biome
```

* ### Usage

```js
generateMap(
    // List of biomes parameters
    bioms: Biome[],
    // Generation parameters
    parameters: GenerationParameters
): number[][]
```

* ### Biome parameters

Parameter   | Description               | Type
----------- | ------------------------- | -------
`tileIndex` | Texture index for tilemap | number
`level`     | Biome breakpoint (height) | number

* ### Generation parameters

Parameter        | Description                     | Type      | Default
---------------- | ------------------------------- | --------- | ----
`width`          | Map width                       | number    | 
`height`         | Map height                      | number    | 
`frequency`      | Map detalization                | number    | 10
`redistribution` | Degree of increase in recession | number    | 1.1
`octaves`        | Perlin octaves                  | number    | 4
`ampFalloff`     | Gain smoothing                  | number    | 0.5
`fillEmpty`      | Tile index for empty bioms      | number    | 

* ### Example

```js
const generateMap = require('gen-biome');

const BIOMES = {
    WATER: 0,
    GRASS: 1,
    MOUNTS: 2,
};

const biomeList = [{
    tileIndex: BIOMES.WATER,
    level: 0.15,
}, {
    tileIndex: BIOMES.GRASS,
    level: 0.60,
}, {
    tileIndex: BIOMES.MOUNTS,
    level: 1.00,
}];

const tilemap = generateMap(biomeList, {
    width: 500,
    height: 400,
    frequency: 20,
    redistribution: 1.5,
});
```