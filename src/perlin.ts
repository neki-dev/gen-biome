/* eslint-disable no-bitwise */
type NoiseParameters = {
  x: number
  y: number
  octaves: number
  seed: number[]
};

export const DEFAULT_PERLIN_SIZE = 4095;

const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_AMP_FALLOFF = 0.5;

function scaledCosine(i: number): number {
  return 0.5 * (1.0 - Math.cos(i * Math.PI));
}

export default function generateNoise(parameters: NoiseParameters): number {
  const {
    x, y, seed, octaves,
  } = parameters;

  const PERLIN_SIZE = seed.length - 1;

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

  return r;
}
