/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demo/src/biomes.ts":
/*!****************************!*\
  !*** ./demo/src/biomes.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BIOMES = void 0;
exports.BIOMES = [
    {
        params: {
            lowerBound: 0.0,
            upperBound: 0.20,
        },
        data: {
            name: 'WATER',
            color: 'dodgerblue',
        },
    },
    {
        params: {
            lowerBound: 0.2,
            upperBound: 0.3,
        },
        data: {
            name: 'SAND',
            color: '#edd665',
        },
    },
    {
        params: {
            lowerBound: 0.3,
            upperBound: 0.7,
        },
        data: {
            name: 'GRASS',
            color: '#9bd138',
        },
    },
    {
        params: {
            lowerBound: 0.7,
            upperBound: 0.9,
        },
        data: {
            name: 'MOUNT',
            color: 'gray',
        },
    },
    {
        params: {
            lowerBound: 0.9,
        },
        data: {
            name: 'SNOW',
            color: 'white',
        },
    },
];


/***/ }),

/***/ "./demo/src/interface.ts":
/*!*******************************!*\
  !*** ./demo/src/interface.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ui = void 0;
exports.ui = {
    screen: document.getElementById('screen'),
    inputs: {
        resetSeed: document.querySelector('[name=resetSeed]'),
        frequencyChange: document.querySelector('[name=frequencyChange]'),
        borderSmoothness: document.querySelector('[name=borderSmoothness]'),
        heightRedistribution: document.querySelector('[name=heightRedistribution]'),
        worldWidth: document.querySelector('[name=worldWidth]'),
        worldHeight: document.querySelector('[name=worldHeight]'),
    },
    buttons: {
        generate: document.getElementById('generate'),
    },
};


/***/ }),

/***/ "./demo/src/render.ts":
/*!****************************!*\
  !*** ./demo/src/render.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderOnCanvas = void 0;
const interface_1 = __webpack_require__(/*! ./interface */ "./demo/src/interface.ts");
const ctx = interface_1.ui.screen.getContext('2d');
const tileSize = 2;
function renderOnCanvas(world) {
    var _a;
    interface_1.ui.screen.width = world.width * tileSize;
    interface_1.ui.screen.height = world.height * tileSize;
    for (let y = 0; y < world.height; y++) {
        for (let x = 0; x < world.width; x++) {
            const biome = world.getAt({ x, y });
            ctx.fillStyle = (_a = biome === null || biome === void 0 ? void 0 : biome.color) !== null && _a !== void 0 ? _a : 'purple';
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}
exports.renderOnCanvas = renderOnCanvas;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./world */ "./src/world.ts"), exports);
__exportStar(__webpack_require__(/*! ./world-generator */ "./src/world-generator.ts"), exports);
__exportStar(__webpack_require__(/*! ./world-layer */ "./src/world-layer.ts"), exports);
__exportStar(__webpack_require__(/*! ./world-biome */ "./src/world-biome.ts"), exports);
__exportStar(__webpack_require__(/*! ./types */ "./src/types.ts"), exports);


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/utils/clamp.ts":
/*!****************************!*\
  !*** ./src/utils/clamp.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clamp = void 0;
function clamp(value, defaultValue, limit = [0, 1]) {
    return Math.max(limit[0], Math.min(limit[1], value !== null && value !== void 0 ? value : defaultValue));
}
exports.clamp = clamp;


/***/ }),

/***/ "./src/utils/perlin.ts":
/*!*****************************!*\
  !*** ./src/utils/perlin.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateNoise = exports.generateSeed = void 0;
const DEFAULT_PERLIN_SIZE = 4095;
const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_AMP_FALLOFF = 0.5;
const PERLIN_AVG_POWER = 1.1;
function scaledCosine(i) {
    return 0.5 * (1.0 - Math.cos(i * Math.PI));
}
function generateSeed() {
    const seed = [];
    for (let i = 0; i < DEFAULT_PERLIN_SIZE + 1; i++) {
        seed.push(Math.random());
    }
    return seed;
}
exports.generateSeed = generateSeed;
function generateNoise(parameters) {
    let { x, y } = parameters;
    const { seed, frequency, redistribution, octaves, } = parameters;
    const PERLIN_SIZE = seed.length - 1;
    x *= frequency;
    y *= frequency;
    let xi = Math.floor(x);
    let yi = Math.floor(y);
    let xf = x - xi;
    let yf = y - yi;
    let rxf;
    let ryf;
    let r = 0;
    let ampl = 0.5;
    let n1;
    let n2;
    let n3;
    for (let o = 0; o < octaves; o++) {
        let of = xi + (yi << PERLIN_YWRAPB);
        rxf = scaledCosine(xf);
        ryf = scaledCosine(yf);
        n1 = seed[of & PERLIN_SIZE];
        n1 += rxf * (seed[(of + 1) & PERLIN_SIZE] - n1);
        n2 = seed[(of + PERLIN_YWRAP) & PERLIN_SIZE];
        n2 += rxf * (seed[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
        n1 += ryf * (n2 - n1);
        of += PERLIN_ZWRAP;
        n2 = seed[of & PERLIN_SIZE];
        n2 += rxf * (seed[(of + 1) & PERLIN_SIZE] - n2);
        n3 = seed[(of + PERLIN_YWRAP) & PERLIN_SIZE];
        n3 += rxf * (seed[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
        n2 += ryf * (n3 - n2);
        r += n1 * ampl;
        ampl *= PERLIN_AMP_FALLOFF;
        xi <<= 1;
        xf *= 2;
        if (xf >= 1.0) {
            xi++;
            xf--;
        }
        yi <<= 1;
        yf *= 2;
        if (yf >= 1.0) {
            yi++;
            yf--;
        }
    }
    if (r > 0.5) {
        r = Math.pow(r, (1.5 - r) / PERLIN_AVG_POWER);
    }
    else if (r < 0.5) {
        r = Math.pow(r, (1.5 - r) * PERLIN_AVG_POWER);
    }
    r = Math.pow(r, redistribution);
    return r;
}
exports.generateNoise = generateNoise;


/***/ }),

/***/ "./src/world-biome.ts":
/*!****************************!*\
  !*** ./src/world-biome.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorldBiome = void 0;
class WorldBiome {
    constructor(params, data) {
        var _a, _b;
        this.lowerBound = Math.max(0, (_a = params.lowerBound) !== null && _a !== void 0 ? _a : 0);
        this.upperBound = Math.min(1, (_b = params.upperBound) !== null && _b !== void 0 ? _b : 1);
        this.data = data;
    }
}
exports.WorldBiome = WorldBiome;


/***/ }),

/***/ "./src/world-generator.ts":
/*!********************************!*\
  !*** ./src/world-generator.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorldGenerator = void 0;
const perlin_1 = __webpack_require__(/*! ./utils/perlin */ "./src/utils/perlin.ts");
const world_1 = __webpack_require__(/*! ./world */ "./src/world.ts");
class WorldGenerator {
    constructor(params) {
        this.layers = [];
        this.width = params.width;
        this.height = params.height;
    }
    addLayer(layer) {
        this.layers.push(layer);
    }
    clearLayers() {
        this.layers = [];
    }
    getLayers() {
        return this.layers;
    }
    generate(seed) {
        const currentSeed = seed !== null && seed !== void 0 ? seed : (0, perlin_1.generateSeed)();
        const matrix = [];
        for (const layer of this.layers) {
            const layerMatrix = this.generateLayer(layer, currentSeed);
            for (let y = 0; y < layerMatrix.length; y++) {
                if (!matrix[y]) {
                    matrix[y] = [];
                }
                for (let x = 0; x < layerMatrix[y].length; x++) {
                    if (layerMatrix[y][x]) {
                        matrix[y][x] = layerMatrix[y][x].data;
                    }
                }
            }
        }
        return new world_1.World(matrix, currentSeed);
    }
    generateLayer(layer, seed) {
        const params = layer.getGenerationParams();
        const matrix = [];
        for (let y = 0; y < this.height; y++) {
            matrix[y] = [];
            for (let x = 0; x < this.width; x++) {
                const height = (0, perlin_1.generateNoise)(Object.assign(Object.assign({}, params), { seed, x: x / this.width, y: y / this.height }));
                const biome = layer.getBiomeByHeight(height);
                if (biome) {
                    matrix[y][x] = biome;
                }
            }
        }
        return matrix;
    }
}
exports.WorldGenerator = WorldGenerator;


/***/ }),

/***/ "./src/world-layer.ts":
/*!****************************!*\
  !*** ./src/world-layer.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorldLayer = void 0;
const clamp_1 = __webpack_require__(/*! ./utils/clamp */ "./src/utils/clamp.ts");
class WorldLayer {
    constructor(params = {}) {
        this.biomes = [];
        this.frequency = Math.round((0, clamp_1.clamp)(params === null || params === void 0 ? void 0 : params.frequencyChange, 0.3) * 31 + 1);
        this.octaves = Math.round((1 - (0, clamp_1.clamp)(params === null || params === void 0 ? void 0 : params.borderSmoothness, 0.5)) * 14 + 1);
        this.redistribution = 2.0 - (0, clamp_1.clamp)(params === null || params === void 0 ? void 0 : params.heightRedistribution, 1.0, [0.5, 1.5]);
    }
    addBiome(biome) {
        this.biomes.push(biome);
    }
    clearBiomes() {
        this.biomes = [];
    }
    getBiomes() {
        return this.biomes;
    }
    getBiomeByHeight(height) {
        return this.getBiomes().find((biome) => (height >= biome.lowerBound && height <= biome.upperBound));
    }
    getGenerationParams() {
        return {
            frequency: this.frequency,
            octaves: this.octaves,
            redistribution: this.redistribution,
        };
    }
}
exports.WorldLayer = WorldLayer;


/***/ }),

/***/ "./src/world.ts":
/*!**********************!*\
  !*** ./src/world.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.World = void 0;
class World {
    constructor(matrix, seed) {
        this.matrix = [];
        this.width = matrix[0].length;
        this.height = matrix.length;
        this.matrix = matrix;
        this.seed = seed;
    }
    getMatrix() {
        return this.matrix;
    }
    getAt(position) {
        var _a;
        return (_a = this.matrix[position.y]) === null || _a === void 0 ? void 0 : _a[position.x];
    }
    replaceAt(position, data) {
        if (position.y >= this.height || position.x > this.width) {
            throw Error('Указанная позиция биома выходит за границы мира');
        }
        this.matrix[position.y][position.x] = data;
    }
    getSeed() {
        return this.seed;
    }
}
exports.World = World;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***************************!*\
  !*** ./demo/src/index.ts ***!
  \***************************/

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const index_1 = __webpack_require__(/*! ../../src/index */ "./src/index.ts");
const render_1 = __webpack_require__(/*! ./render */ "./demo/src/render.ts");
const biomes_1 = __webpack_require__(/*! ./biomes */ "./demo/src/biomes.ts");
const interface_1 = __webpack_require__(/*! ./interface */ "./demo/src/interface.ts");
let savedSeed;
(_a = interface_1.ui.buttons.generate) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    var _a, _b, _c, _d, _e, _f;
    const generator = new index_1.WorldGenerator({
        width: Number((_a = interface_1.ui.inputs.worldWidth) === null || _a === void 0 ? void 0 : _a.value),
        height: Number((_b = interface_1.ui.inputs.worldHeight) === null || _b === void 0 ? void 0 : _b.value),
    });
    const layer = new index_1.WorldLayer({
        frequencyChange: Number((_c = interface_1.ui.inputs.frequencyChange) === null || _c === void 0 ? void 0 : _c.value),
        borderSmoothness: Number((_d = interface_1.ui.inputs.borderSmoothness) === null || _d === void 0 ? void 0 : _d.value),
        heightRedistribution: Number((_e = interface_1.ui.inputs.heightRedistribution) === null || _e === void 0 ? void 0 : _e.value),
    });
    generator.addLayer(layer);
    for (const { params, data } of biomes_1.BIOMES) {
        const biome = new index_1.WorldBiome(params, data);
        layer.addBiome(biome);
    }
    const seed = ((_f = interface_1.ui.inputs.resetSeed) === null || _f === void 0 ? void 0 : _f.checked) ? undefined : savedSeed;
    const world = generator.generate(seed);
    savedSeed = world.getSeed();
    (0, render_1.renderOnCanvas)(world);
});
(_b = interface_1.ui.buttons.generate) === null || _b === void 0 ? void 0 : _b.click();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYjtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxnQkFBZ0IsbUJBQU8sQ0FBQyx1Q0FBaUI7QUFDekMsaUJBQWlCLG1CQUFPLENBQUMsc0NBQVU7QUFDbkMsaUJBQWlCLG1CQUFPLENBQUMsc0NBQVU7QUFDbkMsb0JBQW9CLG1CQUFPLENBQUMsNENBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsaUJBQWlCLGVBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9kZW1vL3NyYy9iaW9tZXMudHMiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lLy4vZGVtby9zcmMvaW50ZXJmYWNlLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL2RlbW8vc3JjL3JlbmRlci50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lLy4vc3JjL3R5cGVzLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL3NyYy91dGlscy9jbGFtcC50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9zcmMvdXRpbHMvcGVybGluLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL3NyYy93b3JsZC1iaW9tZS50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9zcmMvd29ybGQtZ2VuZXJhdG9yLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL3NyYy93b3JsZC1sYXllci50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9zcmMvd29ybGQudHMiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dlbi1iaW9tZS8uL2RlbW8vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CSU9NRVMgPSB2b2lkIDA7XG5leHBvcnRzLkJJT01FUyA9IFtcbiAgICB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgbG93ZXJCb3VuZDogMC4wLFxuICAgICAgICAgICAgdXBwZXJCb3VuZDogMC4yMCxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbmFtZTogJ1dBVEVSJyxcbiAgICAgICAgICAgIGNvbG9yOiAnZG9kZ2VyYmx1ZScsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgbG93ZXJCb3VuZDogMC4yLFxuICAgICAgICAgICAgdXBwZXJCb3VuZDogMC4zLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiAnU0FORCcsXG4gICAgICAgICAgICBjb2xvcjogJyNlZGQ2NjUnLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGxvd2VyQm91bmQ6IDAuMyxcbiAgICAgICAgICAgIHVwcGVyQm91bmQ6IDAuNyxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbmFtZTogJ0dSQVNTJyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzliZDEzOCcsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgbG93ZXJCb3VuZDogMC43LFxuICAgICAgICAgICAgdXBwZXJCb3VuZDogMC45LFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiAnTU9VTlQnLFxuICAgICAgICAgICAgY29sb3I6ICdncmF5JyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBsb3dlckJvdW5kOiAwLjksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG5hbWU6ICdTTk9XJyxcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICB9LFxuICAgIH0sXG5dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVpID0gdm9pZCAwO1xuZXhwb3J0cy51aSA9IHtcbiAgICBzY3JlZW46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JlZW4nKSxcbiAgICBpbnB1dHM6IHtcbiAgICAgICAgcmVzZXRTZWVkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1yZXNldFNlZWRdJyksXG4gICAgICAgIGZyZXF1ZW5jeUNoYW5nZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9ZnJlcXVlbmN5Q2hhbmdlXScpLFxuICAgICAgICBib3JkZXJTbW9vdGhuZXNzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1ib3JkZXJTbW9vdGhuZXNzXScpLFxuICAgICAgICBoZWlnaHRSZWRpc3RyaWJ1dGlvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9aGVpZ2h0UmVkaXN0cmlidXRpb25dJyksXG4gICAgICAgIHdvcmxkV2lkdGg6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPXdvcmxkV2lkdGhdJyksXG4gICAgICAgIHdvcmxkSGVpZ2h0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT13b3JsZEhlaWdodF0nKSxcbiAgICB9LFxuICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgZ2VuZXJhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW5lcmF0ZScpLFxuICAgIH0sXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlbmRlck9uQ2FudmFzID0gdm9pZCAwO1xuY29uc3QgaW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VcIik7XG5jb25zdCBjdHggPSBpbnRlcmZhY2VfMS51aS5zY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IHRpbGVTaXplID0gMjtcbmZ1bmN0aW9uIHJlbmRlck9uQ2FudmFzKHdvcmxkKSB7XG4gICAgdmFyIF9hO1xuICAgIGludGVyZmFjZV8xLnVpLnNjcmVlbi53aWR0aCA9IHdvcmxkLndpZHRoICogdGlsZVNpemU7XG4gICAgaW50ZXJmYWNlXzEudWkuc2NyZWVuLmhlaWdodCA9IHdvcmxkLmhlaWdodCAqIHRpbGVTaXplO1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgd29ybGQuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB3b3JsZC53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICBjb25zdCBiaW9tZSA9IHdvcmxkLmdldEF0KHsgeCwgeSB9KTtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAoX2EgPSBiaW9tZSA9PT0gbnVsbCB8fCBiaW9tZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmlvbWUuY29sb3IpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdwdXJwbGUnO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHggKiB0aWxlU2l6ZSwgeSAqIHRpbGVTaXplLCB0aWxlU2l6ZSwgdGlsZVNpemUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5yZW5kZXJPbkNhbnZhcyA9IHJlbmRlck9uQ2FudmFzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi93b3JsZFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vd29ybGQtZ2VuZXJhdG9yXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi93b3JsZC1sYXllclwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vd29ybGQtYmlvbWVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3R5cGVzXCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNsYW1wID0gdm9pZCAwO1xuZnVuY3Rpb24gY2xhbXAodmFsdWUsIGRlZmF1bHRWYWx1ZSwgbGltaXQgPSBbMCwgMV0pIHtcbiAgICByZXR1cm4gTWF0aC5tYXgobGltaXRbMF0sIE1hdGgubWluKGxpbWl0WzFdLCB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwID8gdmFsdWUgOiBkZWZhdWx0VmFsdWUpKTtcbn1cbmV4cG9ydHMuY2xhbXAgPSBjbGFtcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZW5lcmF0ZU5vaXNlID0gZXhwb3J0cy5nZW5lcmF0ZVNlZWQgPSB2b2lkIDA7XG5jb25zdCBERUZBVUxUX1BFUkxJTl9TSVpFID0gNDA5NTtcbmNvbnN0IFBFUkxJTl9ZV1JBUEIgPSA0O1xuY29uc3QgUEVSTElOX1lXUkFQID0gMSA8PCBQRVJMSU5fWVdSQVBCO1xuY29uc3QgUEVSTElOX1pXUkFQQiA9IDg7XG5jb25zdCBQRVJMSU5fWldSQVAgPSAxIDw8IFBFUkxJTl9aV1JBUEI7XG5jb25zdCBQRVJMSU5fQU1QX0ZBTExPRkYgPSAwLjU7XG5jb25zdCBQRVJMSU5fQVZHX1BPV0VSID0gMS4xO1xuZnVuY3Rpb24gc2NhbGVkQ29zaW5lKGkpIHtcbiAgICByZXR1cm4gMC41ICogKDEuMCAtIE1hdGguY29zKGkgKiBNYXRoLlBJKSk7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVNlZWQoKSB7XG4gICAgY29uc3Qgc2VlZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgREVGQVVMVF9QRVJMSU5fU0laRSArIDE7IGkrKykge1xuICAgICAgICBzZWVkLnB1c2goTWF0aC5yYW5kb20oKSk7XG4gICAgfVxuICAgIHJldHVybiBzZWVkO1xufVxuZXhwb3J0cy5nZW5lcmF0ZVNlZWQgPSBnZW5lcmF0ZVNlZWQ7XG5mdW5jdGlvbiBnZW5lcmF0ZU5vaXNlKHBhcmFtZXRlcnMpIHtcbiAgICBsZXQgeyB4LCB5IH0gPSBwYXJhbWV0ZXJzO1xuICAgIGNvbnN0IHsgc2VlZCwgZnJlcXVlbmN5LCByZWRpc3RyaWJ1dGlvbiwgb2N0YXZlcywgfSA9IHBhcmFtZXRlcnM7XG4gICAgY29uc3QgUEVSTElOX1NJWkUgPSBzZWVkLmxlbmd0aCAtIDE7XG4gICAgeCAqPSBmcmVxdWVuY3k7XG4gICAgeSAqPSBmcmVxdWVuY3k7XG4gICAgbGV0IHhpID0gTWF0aC5mbG9vcih4KTtcbiAgICBsZXQgeWkgPSBNYXRoLmZsb29yKHkpO1xuICAgIGxldCB4ZiA9IHggLSB4aTtcbiAgICBsZXQgeWYgPSB5IC0geWk7XG4gICAgbGV0IHJ4ZjtcbiAgICBsZXQgcnlmO1xuICAgIGxldCByID0gMDtcbiAgICBsZXQgYW1wbCA9IDAuNTtcbiAgICBsZXQgbjE7XG4gICAgbGV0IG4yO1xuICAgIGxldCBuMztcbiAgICBmb3IgKGxldCBvID0gMDsgbyA8IG9jdGF2ZXM7IG8rKykge1xuICAgICAgICBsZXQgb2YgPSB4aSArICh5aSA8PCBQRVJMSU5fWVdSQVBCKTtcbiAgICAgICAgcnhmID0gc2NhbGVkQ29zaW5lKHhmKTtcbiAgICAgICAgcnlmID0gc2NhbGVkQ29zaW5lKHlmKTtcbiAgICAgICAgbjEgPSBzZWVkW29mICYgUEVSTElOX1NJWkVdO1xuICAgICAgICBuMSArPSByeGYgKiAoc2VlZFsob2YgKyAxKSAmIFBFUkxJTl9TSVpFXSAtIG4xKTtcbiAgICAgICAgbjIgPSBzZWVkWyhvZiArIFBFUkxJTl9ZV1JBUCkgJiBQRVJMSU5fU0laRV07XG4gICAgICAgIG4yICs9IHJ4ZiAqIChzZWVkWyhvZiArIFBFUkxJTl9ZV1JBUCArIDEpICYgUEVSTElOX1NJWkVdIC0gbjIpO1xuICAgICAgICBuMSArPSByeWYgKiAobjIgLSBuMSk7XG4gICAgICAgIG9mICs9IFBFUkxJTl9aV1JBUDtcbiAgICAgICAgbjIgPSBzZWVkW29mICYgUEVSTElOX1NJWkVdO1xuICAgICAgICBuMiArPSByeGYgKiAoc2VlZFsob2YgKyAxKSAmIFBFUkxJTl9TSVpFXSAtIG4yKTtcbiAgICAgICAgbjMgPSBzZWVkWyhvZiArIFBFUkxJTl9ZV1JBUCkgJiBQRVJMSU5fU0laRV07XG4gICAgICAgIG4zICs9IHJ4ZiAqIChzZWVkWyhvZiArIFBFUkxJTl9ZV1JBUCArIDEpICYgUEVSTElOX1NJWkVdIC0gbjMpO1xuICAgICAgICBuMiArPSByeWYgKiAobjMgLSBuMik7XG4gICAgICAgIHIgKz0gbjEgKiBhbXBsO1xuICAgICAgICBhbXBsICo9IFBFUkxJTl9BTVBfRkFMTE9GRjtcbiAgICAgICAgeGkgPDw9IDE7XG4gICAgICAgIHhmICo9IDI7XG4gICAgICAgIGlmICh4ZiA+PSAxLjApIHtcbiAgICAgICAgICAgIHhpKys7XG4gICAgICAgICAgICB4Zi0tO1xuICAgICAgICB9XG4gICAgICAgIHlpIDw8PSAxO1xuICAgICAgICB5ZiAqPSAyO1xuICAgICAgICBpZiAoeWYgPj0gMS4wKSB7XG4gICAgICAgICAgICB5aSsrO1xuICAgICAgICAgICAgeWYtLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAociA+IDAuNSkge1xuICAgICAgICByID0gTWF0aC5wb3cociwgKDEuNSAtIHIpIC8gUEVSTElOX0FWR19QT1dFUik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHIgPCAwLjUpIHtcbiAgICAgICAgciA9IE1hdGgucG93KHIsICgxLjUgLSByKSAqIFBFUkxJTl9BVkdfUE9XRVIpO1xuICAgIH1cbiAgICByID0gTWF0aC5wb3cociwgcmVkaXN0cmlidXRpb24pO1xuICAgIHJldHVybiByO1xufVxuZXhwb3J0cy5nZW5lcmF0ZU5vaXNlID0gZ2VuZXJhdGVOb2lzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Xb3JsZEJpb21lID0gdm9pZCAwO1xuY2xhc3MgV29ybGRCaW9tZSB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zLCBkYXRhKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMubG93ZXJCb3VuZCA9IE1hdGgubWF4KDAsIChfYSA9IHBhcmFtcy5sb3dlckJvdW5kKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwKTtcbiAgICAgICAgdGhpcy51cHBlckJvdW5kID0gTWF0aC5taW4oMSwgKF9iID0gcGFyYW1zLnVwcGVyQm91bmQpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDEpO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbn1cbmV4cG9ydHMuV29ybGRCaW9tZSA9IFdvcmxkQmlvbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV29ybGRHZW5lcmF0b3IgPSB2b2lkIDA7XG5jb25zdCBwZXJsaW5fMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3BlcmxpblwiKTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi93b3JsZFwiKTtcbmNsYXNzIFdvcmxkR2VuZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5sYXllcnMgPSBbXTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHBhcmFtcy53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBwYXJhbXMuaGVpZ2h0O1xuICAgIH1cbiAgICBhZGRMYXllcihsYXllcikge1xuICAgICAgICB0aGlzLmxheWVycy5wdXNoKGxheWVyKTtcbiAgICB9XG4gICAgY2xlYXJMYXllcnMoKSB7XG4gICAgICAgIHRoaXMubGF5ZXJzID0gW107XG4gICAgfVxuICAgIGdldExheWVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzO1xuICAgIH1cbiAgICBnZW5lcmF0ZShzZWVkKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWVkID0gc2VlZCAhPT0gbnVsbCAmJiBzZWVkICE9PSB2b2lkIDAgPyBzZWVkIDogKDAsIHBlcmxpbl8xLmdlbmVyYXRlU2VlZCkoKTtcbiAgICAgICAgY29uc3QgbWF0cml4ID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgdGhpcy5sYXllcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGxheWVyTWF0cml4ID0gdGhpcy5nZW5lcmF0ZUxheWVyKGxheWVyLCBjdXJyZW50U2VlZCk7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGxheWVyTWF0cml4Lmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtYXRyaXhbeV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0cml4W3ldID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgbGF5ZXJNYXRyaXhbeV0ubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxheWVyTWF0cml4W3ldW3hdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRyaXhbeV1beF0gPSBsYXllck1hdHJpeFt5XVt4XS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgd29ybGRfMS5Xb3JsZChtYXRyaXgsIGN1cnJlbnRTZWVkKTtcbiAgICB9XG4gICAgZ2VuZXJhdGVMYXllcihsYXllciwgc2VlZCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBsYXllci5nZXRHZW5lcmF0aW9uUGFyYW1zKCk7XG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIG1hdHJpeFt5XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWlnaHQgPSAoMCwgcGVybGluXzEuZ2VuZXJhdGVOb2lzZSkoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCB7IHNlZWQsIHg6IHggLyB0aGlzLndpZHRoLCB5OiB5IC8gdGhpcy5oZWlnaHQgfSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJpb21lID0gbGF5ZXIuZ2V0QmlvbWVCeUhlaWdodChoZWlnaHQpO1xuICAgICAgICAgICAgICAgIGlmIChiaW9tZSkge1xuICAgICAgICAgICAgICAgICAgICBtYXRyaXhbeV1beF0gPSBiaW9tZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdHJpeDtcbiAgICB9XG59XG5leHBvcnRzLldvcmxkR2VuZXJhdG9yID0gV29ybGRHZW5lcmF0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV29ybGRMYXllciA9IHZvaWQgMDtcbmNvbnN0IGNsYW1wXzEgPSByZXF1aXJlKFwiLi91dGlscy9jbGFtcFwiKTtcbmNsYXNzIFdvcmxkTGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHRoaXMuYmlvbWVzID0gW107XG4gICAgICAgIHRoaXMuZnJlcXVlbmN5ID0gTWF0aC5yb3VuZCgoMCwgY2xhbXBfMS5jbGFtcCkocGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLmZyZXF1ZW5jeUNoYW5nZSwgMC4zKSAqIDMxICsgMSk7XG4gICAgICAgIHRoaXMub2N0YXZlcyA9IE1hdGgucm91bmQoKDEgLSAoMCwgY2xhbXBfMS5jbGFtcCkocGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLmJvcmRlclNtb290aG5lc3MsIDAuNSkpICogMTQgKyAxKTtcbiAgICAgICAgdGhpcy5yZWRpc3RyaWJ1dGlvbiA9IDIuMCAtICgwLCBjbGFtcF8xLmNsYW1wKShwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMuaGVpZ2h0UmVkaXN0cmlidXRpb24sIDEuMCwgWzAuNSwgMS41XSk7XG4gICAgfVxuICAgIGFkZEJpb21lKGJpb21lKSB7XG4gICAgICAgIHRoaXMuYmlvbWVzLnB1c2goYmlvbWUpO1xuICAgIH1cbiAgICBjbGVhckJpb21lcygpIHtcbiAgICAgICAgdGhpcy5iaW9tZXMgPSBbXTtcbiAgICB9XG4gICAgZ2V0QmlvbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iaW9tZXM7XG4gICAgfVxuICAgIGdldEJpb21lQnlIZWlnaHQoaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJpb21lcygpLmZpbmQoKGJpb21lKSA9PiAoaGVpZ2h0ID49IGJpb21lLmxvd2VyQm91bmQgJiYgaGVpZ2h0IDw9IGJpb21lLnVwcGVyQm91bmQpKTtcbiAgICB9XG4gICAgZ2V0R2VuZXJhdGlvblBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZyZXF1ZW5jeTogdGhpcy5mcmVxdWVuY3ksXG4gICAgICAgICAgICBvY3RhdmVzOiB0aGlzLm9jdGF2ZXMsXG4gICAgICAgICAgICByZWRpc3RyaWJ1dGlvbjogdGhpcy5yZWRpc3RyaWJ1dGlvbixcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLldvcmxkTGF5ZXIgPSBXb3JsZExheWVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldvcmxkID0gdm9pZCAwO1xuY2xhc3MgV29ybGQge1xuICAgIGNvbnN0cnVjdG9yKG1hdHJpeCwgc2VlZCkge1xuICAgICAgICB0aGlzLm1hdHJpeCA9IFtdO1xuICAgICAgICB0aGlzLndpZHRoID0gbWF0cml4WzBdLmxlbmd0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBtYXRyaXgubGVuZ3RoO1xuICAgICAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcbiAgICAgICAgdGhpcy5zZWVkID0gc2VlZDtcbiAgICB9XG4gICAgZ2V0TWF0cml4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRyaXg7XG4gICAgfVxuICAgIGdldEF0KHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMubWF0cml4W3Bvc2l0aW9uLnldKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbcG9zaXRpb24ueF07XG4gICAgfVxuICAgIHJlcGxhY2VBdChwb3NpdGlvbiwgZGF0YSkge1xuICAgICAgICBpZiAocG9zaXRpb24ueSA+PSB0aGlzLmhlaWdodCB8fCBwb3NpdGlvbi54ID4gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ9Cj0LrQsNC30LDQvdC90LDRjyDQv9C+0LfQuNGG0LjRjyDQsdC40L7QvNCwINCy0YvRhdC+0LTQuNGCINC30LAg0LPRgNCw0L3QuNGG0Ysg0LzQuNGA0LAnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hdHJpeFtwb3NpdGlvbi55XVtwb3NpdGlvbi54XSA9IGRhdGE7XG4gICAgfVxuICAgIGdldFNlZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5Xb3JsZCA9IFdvcmxkO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9hLCBfYjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGluZGV4XzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL2luZGV4XCIpO1xuY29uc3QgcmVuZGVyXzEgPSByZXF1aXJlKFwiLi9yZW5kZXJcIik7XG5jb25zdCBiaW9tZXNfMSA9IHJlcXVpcmUoXCIuL2Jpb21lc1wiKTtcbmNvbnN0IGludGVyZmFjZV8xID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlXCIpO1xubGV0IHNhdmVkU2VlZDtcbihfYSA9IGludGVyZmFjZV8xLnVpLmJ1dHRvbnMuZ2VuZXJhdGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICBjb25zdCBnZW5lcmF0b3IgPSBuZXcgaW5kZXhfMS5Xb3JsZEdlbmVyYXRvcih7XG4gICAgICAgIHdpZHRoOiBOdW1iZXIoKF9hID0gaW50ZXJmYWNlXzEudWkuaW5wdXRzLndvcmxkV2lkdGgpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS52YWx1ZSksXG4gICAgICAgIGhlaWdodDogTnVtYmVyKChfYiA9IGludGVyZmFjZV8xLnVpLmlucHV0cy53b3JsZEhlaWdodCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnZhbHVlKSxcbiAgICB9KTtcbiAgICBjb25zdCBsYXllciA9IG5ldyBpbmRleF8xLldvcmxkTGF5ZXIoe1xuICAgICAgICBmcmVxdWVuY3lDaGFuZ2U6IE51bWJlcigoX2MgPSBpbnRlcmZhY2VfMS51aS5pbnB1dHMuZnJlcXVlbmN5Q2hhbmdlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MudmFsdWUpLFxuICAgICAgICBib3JkZXJTbW9vdGhuZXNzOiBOdW1iZXIoKF9kID0gaW50ZXJmYWNlXzEudWkuaW5wdXRzLmJvcmRlclNtb290aG5lc3MpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC52YWx1ZSksXG4gICAgICAgIGhlaWdodFJlZGlzdHJpYnV0aW9uOiBOdW1iZXIoKF9lID0gaW50ZXJmYWNlXzEudWkuaW5wdXRzLmhlaWdodFJlZGlzdHJpYnV0aW9uKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UudmFsdWUpLFxuICAgIH0pO1xuICAgIGdlbmVyYXRvci5hZGRMYXllcihsYXllcik7XG4gICAgZm9yIChjb25zdCB7IHBhcmFtcywgZGF0YSB9IG9mIGJpb21lc18xLkJJT01FUykge1xuICAgICAgICBjb25zdCBiaW9tZSA9IG5ldyBpbmRleF8xLldvcmxkQmlvbWUocGFyYW1zLCBkYXRhKTtcbiAgICAgICAgbGF5ZXIuYWRkQmlvbWUoYmlvbWUpO1xuICAgIH1cbiAgICBjb25zdCBzZWVkID0gKChfZiA9IGludGVyZmFjZV8xLnVpLmlucHV0cy5yZXNldFNlZWQpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jaGVja2VkKSA/IHVuZGVmaW5lZCA6IHNhdmVkU2VlZDtcbiAgICBjb25zdCB3b3JsZCA9IGdlbmVyYXRvci5nZW5lcmF0ZShzZWVkKTtcbiAgICBzYXZlZFNlZWQgPSB3b3JsZC5nZXRTZWVkKCk7XG4gICAgKDAsIHJlbmRlcl8xLnJlbmRlck9uQ2FudmFzKSh3b3JsZCk7XG59KTtcbihfYiA9IGludGVyZmFjZV8xLnVpLmJ1dHRvbnMuZ2VuZXJhdGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jbGljaygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9