## Biom generator
[![Npm package version](https://badgen.net/npm/v/biom-generator)](https://npmjs.com/package/biom-generator)
[![Small size](https://badge-size.herokuapp.com/neki-dev/biom-generator/master/dist/index.js)](https://github.com/neki-dev/biom-generator/blob/master/dist/index.js)
[![Building](https://github.com/neki-dev/biom-generator/actions/workflows/npm.yml/badge.svg)](https://github.com/neki-dev/biom-generator/actions)

Generation random map with bioms

Example 1 | Example 2 | Example 3
--|---|--
![Example 3](./docs/example-3.png) | ![Example 1](./docs/example-1.png) | ![Example 2](./docs/example-2.png)

.

* ### Install

```sh
npm i biom-generator
```

* ### Usage

```js
generateMap(parameters: GenerationParameters): number[][]
```

* ### Generation parameters

Parameter      | Description                    | Type      | Default
-------------- | ------------------------------ | --------- | ----
width          | Map width                      | number    | 
height         | Map height                     | number    | 
bioms          | Bioms list                     | Biom[]    | 
frequency      | Map detalization               | number    | 10
redistribution | Raise the elevation to a power | number    | 1.1
seed           | Custom perlin seed             | number    | null
regenerateSeed | Regenerate cached seed         | bollean   | false

* ### Biom parameters

Parameter | Description               | Type
--------- | ------------------------- | -------
name      | Biom name                 | string
tileIndex | Texture index for tilemap | number
level     | Biom limit                | number

* ### Example

```js
const generateMap = require('biom-generator');

const BIOMS = [{
    name: 'water',
    tileIndex: 0,
    level: 0.15,
}, {
    name: 'grass',
    tileIndex: 1,
    level: 0.60,
}, {
    name: 'mount',
    tileIndex: 2,
    level: 1.00,
}];

const tilemap = generateMap({
    width: 500,
    height: 400,
    bioms: BIOMS,
});
```