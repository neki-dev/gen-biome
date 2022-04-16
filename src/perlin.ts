/* eslint-disable no-bitwise */
type NoiseParameters = {
  x: number
  y: number
  octaves?: number
  ampFalloff?: number
  seed?: number[]
  regenerateSeed?: boolean
};

const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

function scaledCosine(i: number) {
  return 0.5 * (1.0 - Math.cos(i * Math.PI));
}

function generateSeed() {
  const seed = [];
  for (let i = 0; i < PERLIN_SIZE + 1; i++) {
    seed[i] = Math.random();
  }

  return seed;
}

let perlinSeed = generateSeed();

export default function generateNoise(parameters: NoiseParameters): number {
  const {
    x, y,
    octaves = 4, ampFalloff = 0.5,
    seed, regenerateSeed,
  } = parameters;

  if (regenerateSeed) {
    perlinSeed = generateSeed();
  }

  const currentSeed = seed || perlinSeed;

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

    n1 = currentSeed[of & PERLIN_SIZE];
    n1 += rxf * (currentSeed[(of + 1) & PERLIN_SIZE] - n1);
    n2 = currentSeed[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n2 += rxf * (currentSeed[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = currentSeed[of & PERLIN_SIZE];
    n2 += rxf * (currentSeed[(of + 1) & PERLIN_SIZE] - n2);
    n3 = currentSeed[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n3 += rxf * (currentSeed[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);

    r += n1 * ampl;
    ampl *= ampFalloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;

    if (xf >= 1.0) {
      xi++;
      xf--;
    }
    if (yf >= 1.0) {
      yi++;
      yf--;
    }
  }

  return r;
}
