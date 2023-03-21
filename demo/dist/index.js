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
__exportStar(__webpack_require__(/*! ./world-generator */ "./src/world-generator.ts"), exports);
__exportStar(__webpack_require__(/*! ./world */ "./src/world.ts"), exports);
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
const world_layer_1 = __webpack_require__(/*! ./world-layer */ "./src/world-layer.ts");
class WorldGenerator {
    constructor(params) {
        this.layers = [];
        this.width = params.width;
        this.height = params.height;
    }
    addLayer(params = {}) {
        const layer = new world_layer_1.WorldLayer(params);
        this.layers.push(layer);
        return layer;
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
            for (let y = 0; y < this.height; y++) {
                if (!matrix[y]) {
                    matrix[y] = [];
                }
                for (let x = 0; x < this.width; x++) {
                    if (layerMatrix[y][x]) {
                        matrix[y][x] = layerMatrix[y][x].data;
                    }
                }
            }
        }
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (matrix[y][x] === undefined) {
                    throw Error(`World matrix contains empty biome at ${x},${y}`);
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
const world_biome_1 = __webpack_require__(/*! ./world-biome */ "./src/world-biome.ts");
class WorldLayer {
    constructor(params = {}) {
        this.biomes = [];
        this.frequency = Math.round((0, clamp_1.clamp)(params === null || params === void 0 ? void 0 : params.frequencyChange, 0.3) * 31 + 1);
        this.octaves = Math.round((1 - (0, clamp_1.clamp)(params === null || params === void 0 ? void 0 : params.borderSmoothness, 0.5)) * 14 + 1);
        this.redistribution = 2.0 - (0, clamp_1.clamp)(params === null || params === void 0 ? void 0 : params.heightRedistribution, 1.0, [0.5, 1.5]);
    }
    addBiome(params, data) {
        const biome = new world_biome_1.WorldBiome(params, data);
        this.biomes.push(biome);
        return biome;
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
        if (position.y >= this.height || position.x >= this.width) {
            throw Error('Specified position is out of world bounds');
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
    const layer = generator.addLayer({
        frequencyChange: Number((_c = interface_1.ui.inputs.frequencyChange) === null || _c === void 0 ? void 0 : _c.value),
        borderSmoothness: Number((_d = interface_1.ui.inputs.borderSmoothness) === null || _d === void 0 ? void 0 : _d.value),
        heightRedistribution: Number((_e = interface_1.ui.inputs.heightRedistribution) === null || _e === void 0 ? void 0 : _e.value),
    });
    for (const { params, data } of biomes_1.BIOMES) {
        layer.addBiome(params, data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOzs7Ozs7O1VDNUJiO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYjtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxnQkFBZ0IsbUJBQU8sQ0FBQyx1Q0FBaUI7QUFDekMsaUJBQWlCLG1CQUFPLENBQUMsc0NBQVU7QUFDbkMsaUJBQWlCLG1CQUFPLENBQUMsc0NBQVU7QUFDbkMsb0JBQW9CLG1CQUFPLENBQUMsNENBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGlCQUFpQixlQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL2dlbi1iaW9tZS8uL2RlbW8vc3JjL2Jpb21lcy50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9kZW1vL3NyYy9pbnRlcmZhY2UudHMiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lLy4vZGVtby9zcmMvcmVuZGVyLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvLi9zcmMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lLy4vc3JjL3V0aWxzL2NsYW1wLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL3NyYy91dGlscy9wZXJsaW4udHMiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lLy4vc3JjL3dvcmxkLWJpb21lLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL3NyYy93b3JsZC1nZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lLy4vc3JjL3dvcmxkLWxheWVyLnRzIiwid2VicGFjazovL2dlbi1iaW9tZS8uL3NyYy93b3JsZC50cyIsIndlYnBhY2s6Ly9nZW4tYmlvbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2VuLWJpb21lLy4vZGVtby9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJJT01FUyA9IHZvaWQgMDtcbmV4cG9ydHMuQklPTUVTID0gW1xuICAgIHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBsb3dlckJvdW5kOiAwLjAsXG4gICAgICAgICAgICB1cHBlckJvdW5kOiAwLjIwLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiAnV0FURVInLFxuICAgICAgICAgICAgY29sb3I6ICdkb2RnZXJibHVlJyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBsb3dlckJvdW5kOiAwLjIsXG4gICAgICAgICAgICB1cHBlckJvdW5kOiAwLjMsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG5hbWU6ICdTQU5EJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2VkZDY2NScsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgbG93ZXJCb3VuZDogMC4zLFxuICAgICAgICAgICAgdXBwZXJCb3VuZDogMC43LFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiAnR1JBU1MnLFxuICAgICAgICAgICAgY29sb3I6ICcjOWJkMTM4JyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBsb3dlckJvdW5kOiAwLjcsXG4gICAgICAgICAgICB1cHBlckJvdW5kOiAwLjksXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG5hbWU6ICdNT1VOVCcsXG4gICAgICAgICAgICBjb2xvcjogJ2dyYXknLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGxvd2VyQm91bmQ6IDAuOSxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbmFtZTogJ1NOT1cnLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgIH0sXG4gICAgfSxcbl07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudWkgPSB2b2lkIDA7XG5leHBvcnRzLnVpID0ge1xuICAgIHNjcmVlbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbicpLFxuICAgIGlucHV0czoge1xuICAgICAgICByZXNldFNlZWQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPXJlc2V0U2VlZF0nKSxcbiAgICAgICAgZnJlcXVlbmN5Q2hhbmdlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1mcmVxdWVuY3lDaGFuZ2VdJyksXG4gICAgICAgIGJvcmRlclNtb290aG5lc3M6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPWJvcmRlclNtb290aG5lc3NdJyksXG4gICAgICAgIGhlaWdodFJlZGlzdHJpYnV0aW9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1oZWlnaHRSZWRpc3RyaWJ1dGlvbl0nKSxcbiAgICAgICAgd29ybGRXaWR0aDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9d29ybGRXaWR0aF0nKSxcbiAgICAgICAgd29ybGRIZWlnaHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPXdvcmxkSGVpZ2h0XScpLFxuICAgIH0sXG4gICAgYnV0dG9uczoge1xuICAgICAgICBnZW5lcmF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlbmVyYXRlJyksXG4gICAgfSxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVuZGVyT25DYW52YXMgPSB2b2lkIDA7XG5jb25zdCBpbnRlcmZhY2VfMSA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZVwiKTtcbmNvbnN0IGN0eCA9IGludGVyZmFjZV8xLnVpLnNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuY29uc3QgdGlsZVNpemUgPSAyO1xuZnVuY3Rpb24gcmVuZGVyT25DYW52YXMod29ybGQpIHtcbiAgICB2YXIgX2E7XG4gICAgaW50ZXJmYWNlXzEudWkuc2NyZWVuLndpZHRoID0gd29ybGQud2lkdGggKiB0aWxlU2l6ZTtcbiAgICBpbnRlcmZhY2VfMS51aS5zY3JlZW4uaGVpZ2h0ID0gd29ybGQuaGVpZ2h0ICogdGlsZVNpemU7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB3b3JsZC5oZWlnaHQ7IHkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdvcmxkLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJpb21lID0gd29ybGQuZ2V0QXQoeyB4LCB5IH0pO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IChfYSA9IGJpb21lID09PSBudWxsIHx8IGJpb21lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiaW9tZS5jb2xvcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ3B1cnBsZSc7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoeCAqIHRpbGVTaXplLCB5ICogdGlsZVNpemUsIHRpbGVTaXplLCB0aWxlU2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnJlbmRlck9uQ2FudmFzID0gcmVuZGVyT25DYW52YXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3dvcmxkLWdlbmVyYXRvclwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vd29ybGRcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3R5cGVzXCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNsYW1wID0gdm9pZCAwO1xuZnVuY3Rpb24gY2xhbXAodmFsdWUsIGRlZmF1bHRWYWx1ZSwgbGltaXQgPSBbMCwgMV0pIHtcbiAgICByZXR1cm4gTWF0aC5tYXgobGltaXRbMF0sIE1hdGgubWluKGxpbWl0WzFdLCB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwID8gdmFsdWUgOiBkZWZhdWx0VmFsdWUpKTtcbn1cbmV4cG9ydHMuY2xhbXAgPSBjbGFtcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZW5lcmF0ZU5vaXNlID0gZXhwb3J0cy5nZW5lcmF0ZVNlZWQgPSB2b2lkIDA7XG5jb25zdCBERUZBVUxUX1BFUkxJTl9TSVpFID0gNDA5NTtcbmNvbnN0IFBFUkxJTl9ZV1JBUEIgPSA0O1xuY29uc3QgUEVSTElOX1lXUkFQID0gMSA8PCBQRVJMSU5fWVdSQVBCO1xuY29uc3QgUEVSTElOX1pXUkFQQiA9IDg7XG5jb25zdCBQRVJMSU5fWldSQVAgPSAxIDw8IFBFUkxJTl9aV1JBUEI7XG5jb25zdCBQRVJMSU5fQU1QX0ZBTExPRkYgPSAwLjU7XG5jb25zdCBQRVJMSU5fQVZHX1BPV0VSID0gMS4xO1xuZnVuY3Rpb24gc2NhbGVkQ29zaW5lKGkpIHtcbiAgICByZXR1cm4gMC41ICogKDEuMCAtIE1hdGguY29zKGkgKiBNYXRoLlBJKSk7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVNlZWQoKSB7XG4gICAgY29uc3Qgc2VlZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgREVGQVVMVF9QRVJMSU5fU0laRSArIDE7IGkrKykge1xuICAgICAgICBzZWVkLnB1c2goTWF0aC5yYW5kb20oKSk7XG4gICAgfVxuICAgIHJldHVybiBzZWVkO1xufVxuZXhwb3J0cy5nZW5lcmF0ZVNlZWQgPSBnZW5lcmF0ZVNlZWQ7XG5mdW5jdGlvbiBnZW5lcmF0ZU5vaXNlKHBhcmFtZXRlcnMpIHtcbiAgICBsZXQgeyB4LCB5IH0gPSBwYXJhbWV0ZXJzO1xuICAgIGNvbnN0IHsgc2VlZCwgZnJlcXVlbmN5LCByZWRpc3RyaWJ1dGlvbiwgb2N0YXZlcywgfSA9IHBhcmFtZXRlcnM7XG4gICAgY29uc3QgUEVSTElOX1NJWkUgPSBzZWVkLmxlbmd0aCAtIDE7XG4gICAgeCAqPSBmcmVxdWVuY3k7XG4gICAgeSAqPSBmcmVxdWVuY3k7XG4gICAgbGV0IHhpID0gTWF0aC5mbG9vcih4KTtcbiAgICBsZXQgeWkgPSBNYXRoLmZsb29yKHkpO1xuICAgIGxldCB4ZiA9IHggLSB4aTtcbiAgICBsZXQgeWYgPSB5IC0geWk7XG4gICAgbGV0IHJ4ZjtcbiAgICBsZXQgcnlmO1xuICAgIGxldCByID0gMDtcbiAgICBsZXQgYW1wbCA9IDAuNTtcbiAgICBsZXQgbjE7XG4gICAgbGV0IG4yO1xuICAgIGxldCBuMztcbiAgICBmb3IgKGxldCBvID0gMDsgbyA8IG9jdGF2ZXM7IG8rKykge1xuICAgICAgICBsZXQgb2YgPSB4aSArICh5aSA8PCBQRVJMSU5fWVdSQVBCKTtcbiAgICAgICAgcnhmID0gc2NhbGVkQ29zaW5lKHhmKTtcbiAgICAgICAgcnlmID0gc2NhbGVkQ29zaW5lKHlmKTtcbiAgICAgICAgbjEgPSBzZWVkW29mICYgUEVSTElOX1NJWkVdO1xuICAgICAgICBuMSArPSByeGYgKiAoc2VlZFsob2YgKyAxKSAmIFBFUkxJTl9TSVpFXSAtIG4xKTtcbiAgICAgICAgbjIgPSBzZWVkWyhvZiArIFBFUkxJTl9ZV1JBUCkgJiBQRVJMSU5fU0laRV07XG4gICAgICAgIG4yICs9IHJ4ZiAqIChzZWVkWyhvZiArIFBFUkxJTl9ZV1JBUCArIDEpICYgUEVSTElOX1NJWkVdIC0gbjIpO1xuICAgICAgICBuMSArPSByeWYgKiAobjIgLSBuMSk7XG4gICAgICAgIG9mICs9IFBFUkxJTl9aV1JBUDtcbiAgICAgICAgbjIgPSBzZWVkW29mICYgUEVSTElOX1NJWkVdO1xuICAgICAgICBuMiArPSByeGYgKiAoc2VlZFsob2YgKyAxKSAmIFBFUkxJTl9TSVpFXSAtIG4yKTtcbiAgICAgICAgbjMgPSBzZWVkWyhvZiArIFBFUkxJTl9ZV1JBUCkgJiBQRVJMSU5fU0laRV07XG4gICAgICAgIG4zICs9IHJ4ZiAqIChzZWVkWyhvZiArIFBFUkxJTl9ZV1JBUCArIDEpICYgUEVSTElOX1NJWkVdIC0gbjMpO1xuICAgICAgICBuMiArPSByeWYgKiAobjMgLSBuMik7XG4gICAgICAgIHIgKz0gbjEgKiBhbXBsO1xuICAgICAgICBhbXBsICo9IFBFUkxJTl9BTVBfRkFMTE9GRjtcbiAgICAgICAgeGkgPDw9IDE7XG4gICAgICAgIHhmICo9IDI7XG4gICAgICAgIGlmICh4ZiA+PSAxLjApIHtcbiAgICAgICAgICAgIHhpKys7XG4gICAgICAgICAgICB4Zi0tO1xuICAgICAgICB9XG4gICAgICAgIHlpIDw8PSAxO1xuICAgICAgICB5ZiAqPSAyO1xuICAgICAgICBpZiAoeWYgPj0gMS4wKSB7XG4gICAgICAgICAgICB5aSsrO1xuICAgICAgICAgICAgeWYtLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAociA+IDAuNSkge1xuICAgICAgICByID0gTWF0aC5wb3cociwgKDEuNSAtIHIpIC8gUEVSTElOX0FWR19QT1dFUik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHIgPCAwLjUpIHtcbiAgICAgICAgciA9IE1hdGgucG93KHIsICgxLjUgLSByKSAqIFBFUkxJTl9BVkdfUE9XRVIpO1xuICAgIH1cbiAgICByID0gTWF0aC5wb3cociwgcmVkaXN0cmlidXRpb24pO1xuICAgIHJldHVybiByO1xufVxuZXhwb3J0cy5nZW5lcmF0ZU5vaXNlID0gZ2VuZXJhdGVOb2lzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Xb3JsZEJpb21lID0gdm9pZCAwO1xuY2xhc3MgV29ybGRCaW9tZSB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zLCBkYXRhKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMubG93ZXJCb3VuZCA9IE1hdGgubWF4KDAsIChfYSA9IHBhcmFtcy5sb3dlckJvdW5kKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwKTtcbiAgICAgICAgdGhpcy51cHBlckJvdW5kID0gTWF0aC5taW4oMSwgKF9iID0gcGFyYW1zLnVwcGVyQm91bmQpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDEpO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbn1cbmV4cG9ydHMuV29ybGRCaW9tZSA9IFdvcmxkQmlvbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV29ybGRHZW5lcmF0b3IgPSB2b2lkIDA7XG5jb25zdCBwZXJsaW5fMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3BlcmxpblwiKTtcbmNvbnN0IHdvcmxkXzEgPSByZXF1aXJlKFwiLi93b3JsZFwiKTtcbmNvbnN0IHdvcmxkX2xheWVyXzEgPSByZXF1aXJlKFwiLi93b3JsZC1sYXllclwiKTtcbmNsYXNzIFdvcmxkR2VuZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5sYXllcnMgPSBbXTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHBhcmFtcy53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBwYXJhbXMuaGVpZ2h0O1xuICAgIH1cbiAgICBhZGRMYXllcihwYXJhbXMgPSB7fSkge1xuICAgICAgICBjb25zdCBsYXllciA9IG5ldyB3b3JsZF9sYXllcl8xLldvcmxkTGF5ZXIocGFyYW1zKTtcbiAgICAgICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XG4gICAgICAgIHJldHVybiBsYXllcjtcbiAgICB9XG4gICAgY2xlYXJMYXllcnMoKSB7XG4gICAgICAgIHRoaXMubGF5ZXJzID0gW107XG4gICAgfVxuICAgIGdldExheWVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzO1xuICAgIH1cbiAgICBnZW5lcmF0ZShzZWVkKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWVkID0gc2VlZCAhPT0gbnVsbCAmJiBzZWVkICE9PSB2b2lkIDAgPyBzZWVkIDogKDAsIHBlcmxpbl8xLmdlbmVyYXRlU2VlZCkoKTtcbiAgICAgICAgY29uc3QgbWF0cml4ID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgdGhpcy5sYXllcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGxheWVyTWF0cml4ID0gdGhpcy5nZW5lcmF0ZUxheWVyKGxheWVyLCBjdXJyZW50U2VlZCk7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1hdHJpeFt5XSkge1xuICAgICAgICAgICAgICAgICAgICBtYXRyaXhbeV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxheWVyTWF0cml4W3ldW3hdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRyaXhbeV1beF0gPSBsYXllck1hdHJpeFt5XVt4XS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBpZiAobWF0cml4W3ldW3hdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFdvcmxkIG1hdHJpeCBjb250YWlucyBlbXB0eSBiaW9tZSBhdCAke3h9LCR7eX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyB3b3JsZF8xLldvcmxkKG1hdHJpeCwgY3VycmVudFNlZWQpO1xuICAgIH1cbiAgICBnZW5lcmF0ZUxheWVyKGxheWVyLCBzZWVkKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGxheWVyLmdldEdlbmVyYXRpb25QYXJhbXMoKTtcbiAgICAgICAgY29uc3QgbWF0cml4ID0gW107XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgbWF0cml4W3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9ICgwLCBwZXJsaW5fMS5nZW5lcmF0ZU5vaXNlKShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcyksIHsgc2VlZCwgeDogeCAvIHRoaXMud2lkdGgsIHk6IHkgLyB0aGlzLmhlaWdodCB9KSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmlvbWUgPSBsYXllci5nZXRCaW9tZUJ5SGVpZ2h0KGhlaWdodCk7XG4gICAgICAgICAgICAgICAgaWYgKGJpb21lKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdHJpeFt5XVt4XSA9IGJpb21lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0cml4O1xuICAgIH1cbn1cbmV4cG9ydHMuV29ybGRHZW5lcmF0b3IgPSBXb3JsZEdlbmVyYXRvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Xb3JsZExheWVyID0gdm9pZCAwO1xuY29uc3QgY2xhbXBfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2NsYW1wXCIpO1xuY29uc3Qgd29ybGRfYmlvbWVfMSA9IHJlcXVpcmUoXCIuL3dvcmxkLWJpb21lXCIpO1xuY2xhc3MgV29ybGRMYXllciB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zID0ge30pIHtcbiAgICAgICAgdGhpcy5iaW9tZXMgPSBbXTtcbiAgICAgICAgdGhpcy5mcmVxdWVuY3kgPSBNYXRoLnJvdW5kKCgwLCBjbGFtcF8xLmNsYW1wKShwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMuZnJlcXVlbmN5Q2hhbmdlLCAwLjMpICogMzEgKyAxKTtcbiAgICAgICAgdGhpcy5vY3RhdmVzID0gTWF0aC5yb3VuZCgoMSAtICgwLCBjbGFtcF8xLmNsYW1wKShwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMuYm9yZGVyU21vb3RobmVzcywgMC41KSkgKiAxNCArIDEpO1xuICAgICAgICB0aGlzLnJlZGlzdHJpYnV0aW9uID0gMi4wIC0gKDAsIGNsYW1wXzEuY2xhbXApKHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5oZWlnaHRSZWRpc3RyaWJ1dGlvbiwgMS4wLCBbMC41LCAxLjVdKTtcbiAgICB9XG4gICAgYWRkQmlvbWUocGFyYW1zLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IGJpb21lID0gbmV3IHdvcmxkX2Jpb21lXzEuV29ybGRCaW9tZShwYXJhbXMsIGRhdGEpO1xuICAgICAgICB0aGlzLmJpb21lcy5wdXNoKGJpb21lKTtcbiAgICAgICAgcmV0dXJuIGJpb21lO1xuICAgIH1cbiAgICBjbGVhckJpb21lcygpIHtcbiAgICAgICAgdGhpcy5iaW9tZXMgPSBbXTtcbiAgICB9XG4gICAgZ2V0QmlvbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iaW9tZXM7XG4gICAgfVxuICAgIGdldEJpb21lQnlIZWlnaHQoaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJpb21lcygpLmZpbmQoKGJpb21lKSA9PiAoaGVpZ2h0ID49IGJpb21lLmxvd2VyQm91bmQgJiYgaGVpZ2h0IDw9IGJpb21lLnVwcGVyQm91bmQpKTtcbiAgICB9XG4gICAgZ2V0R2VuZXJhdGlvblBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZyZXF1ZW5jeTogdGhpcy5mcmVxdWVuY3ksXG4gICAgICAgICAgICBvY3RhdmVzOiB0aGlzLm9jdGF2ZXMsXG4gICAgICAgICAgICByZWRpc3RyaWJ1dGlvbjogdGhpcy5yZWRpc3RyaWJ1dGlvbixcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLldvcmxkTGF5ZXIgPSBXb3JsZExheWVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldvcmxkID0gdm9pZCAwO1xuY2xhc3MgV29ybGQge1xuICAgIGNvbnN0cnVjdG9yKG1hdHJpeCwgc2VlZCkge1xuICAgICAgICB0aGlzLm1hdHJpeCA9IFtdO1xuICAgICAgICB0aGlzLndpZHRoID0gbWF0cml4WzBdLmxlbmd0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBtYXRyaXgubGVuZ3RoO1xuICAgICAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcbiAgICAgICAgdGhpcy5zZWVkID0gc2VlZDtcbiAgICB9XG4gICAgZ2V0TWF0cml4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRyaXg7XG4gICAgfVxuICAgIGdldEF0KHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMubWF0cml4W3Bvc2l0aW9uLnldKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbcG9zaXRpb24ueF07XG4gICAgfVxuICAgIHJlcGxhY2VBdChwb3NpdGlvbiwgZGF0YSkge1xuICAgICAgICBpZiAocG9zaXRpb24ueSA+PSB0aGlzLmhlaWdodCB8fCBwb3NpdGlvbi54ID49IHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdTcGVjaWZpZWQgcG9zaXRpb24gaXMgb3V0IG9mIHdvcmxkIGJvdW5kcycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWF0cml4W3Bvc2l0aW9uLnldW3Bvc2l0aW9uLnhdID0gZGF0YTtcbiAgICB9XG4gICAgZ2V0U2VlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VlZDtcbiAgICB9XG59XG5leHBvcnRzLldvcmxkID0gV29ybGQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX2EsIF9iO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaW5kZXhfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvaW5kZXhcIik7XG5jb25zdCByZW5kZXJfMSA9IHJlcXVpcmUoXCIuL3JlbmRlclwiKTtcbmNvbnN0IGJpb21lc18xID0gcmVxdWlyZShcIi4vYmlvbWVzXCIpO1xuY29uc3QgaW50ZXJmYWNlXzEgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VcIik7XG5sZXQgc2F2ZWRTZWVkO1xuKF9hID0gaW50ZXJmYWNlXzEudWkuYnV0dG9ucy5nZW5lcmF0ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mO1xuICAgIGNvbnN0IGdlbmVyYXRvciA9IG5ldyBpbmRleF8xLldvcmxkR2VuZXJhdG9yKHtcbiAgICAgICAgd2lkdGg6IE51bWJlcigoX2EgPSBpbnRlcmZhY2VfMS51aS5pbnB1dHMud29ybGRXaWR0aCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnZhbHVlKSxcbiAgICAgICAgaGVpZ2h0OiBOdW1iZXIoKF9iID0gaW50ZXJmYWNlXzEudWkuaW5wdXRzLndvcmxkSGVpZ2h0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmFsdWUpLFxuICAgIH0pO1xuICAgIGNvbnN0IGxheWVyID0gZ2VuZXJhdG9yLmFkZExheWVyKHtcbiAgICAgICAgZnJlcXVlbmN5Q2hhbmdlOiBOdW1iZXIoKF9jID0gaW50ZXJmYWNlXzEudWkuaW5wdXRzLmZyZXF1ZW5jeUNoYW5nZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnZhbHVlKSxcbiAgICAgICAgYm9yZGVyU21vb3RobmVzczogTnVtYmVyKChfZCA9IGludGVyZmFjZV8xLnVpLmlucHV0cy5ib3JkZXJTbW9vdGhuZXNzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudmFsdWUpLFxuICAgICAgICBoZWlnaHRSZWRpc3RyaWJ1dGlvbjogTnVtYmVyKChfZSA9IGludGVyZmFjZV8xLnVpLmlucHV0cy5oZWlnaHRSZWRpc3RyaWJ1dGlvbikgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnZhbHVlKSxcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0IHsgcGFyYW1zLCBkYXRhIH0gb2YgYmlvbWVzXzEuQklPTUVTKSB7XG4gICAgICAgIGxheWVyLmFkZEJpb21lKHBhcmFtcywgZGF0YSk7XG4gICAgfVxuICAgIGNvbnN0IHNlZWQgPSAoKF9mID0gaW50ZXJmYWNlXzEudWkuaW5wdXRzLnJlc2V0U2VlZCkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmNoZWNrZWQpID8gdW5kZWZpbmVkIDogc2F2ZWRTZWVkO1xuICAgIGNvbnN0IHdvcmxkID0gZ2VuZXJhdG9yLmdlbmVyYXRlKHNlZWQpO1xuICAgIHNhdmVkU2VlZCA9IHdvcmxkLmdldFNlZWQoKTtcbiAgICAoMCwgcmVuZGVyXzEucmVuZGVyT25DYW52YXMpKHdvcmxkKTtcbn0pO1xuKF9iID0gaW50ZXJmYWNlXzEudWkuYnV0dG9ucy5nZW5lcmF0ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNsaWNrKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=