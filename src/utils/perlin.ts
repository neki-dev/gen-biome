import { WorldLayerParams } from '../types';

/* eslint-disable no-bitwise */
type NoiseParameters = {
  seed: number[]
  x: number
  y: number
  width: number
  height: number
  params: WorldLayerParams
};

function clamp(
  value: number | undefined,
  defaultValue: number,
  limit: [number, number] = [0, 1],
) {
  return Math.max(limit[0], Math.min(limit[1], value ?? defaultValue));
}

function scaledCosine(i: number): number {
  return 0.5 * (1.0 - Math.cos(i * Math.PI));
}

function smootherStep(x: number) {
  return (3 * x ** 2) - (2 * x ** 3);
}

function heightFalloff(offset: number, length: number, falloff: number) {
  const radius = length / 2;
  const distance = Math.abs(radius - offset);
  const target = radius * (1 - falloff);

  if (distance < target) {
    return 1;
  }

  let x = ((distance - target) / radius) / (1 - target / radius);

  x = Math.min(1, Math.max(0, x));

  return 1 - smootherStep(x);
}

export function generateNoise(parameters: NoiseParameters): number {
  const {
    x, y, width, height, seed, params,
  } = parameters;

  const frequency = Math.round(clamp(params.frequencyChange, 0.3) * 31 + 1);
  const octaves = Math.round((1 - clamp(params.borderSmoothness, 0.5)) * 14 + 1);
  const redistribution = 2.0 - clamp(params.heightRedistribution, 1.0, [0.5, 1.5]);
  const falloff = clamp(params.falloff, 0.0, [0.0, 0.9]);
  const averaging = params.heightAveraging ?? true;

  const PERLIN_SIZE = seed.length - 1;
  const PERLIN_YWRAPB = 4;
  const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
  const PERLIN_ZWRAPB = 8;
  const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
  const PERLIN_AMP_FALLOFF = 0.5;
  const PERLIN_AVG_POWER = 1.1;

  const cx = (x / width) * frequency;
  const cy = (y / height) * frequency;

  let xi = Math.floor(cx);
  let yi = Math.floor(cy);
  let xf = cx - xi;
  let yf = cy - yi;
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

  if (averaging) {
    if (r > 0.5) {
      r **= (1.5 - r) / PERLIN_AVG_POWER;
    } else if (r < 0.5) {
      r **= (1.5 - r) * PERLIN_AVG_POWER;
    }
  }

  r **= redistribution;

  if (falloff) {
    r *= heightFalloff(x, width, falloff) * heightFalloff(y, height, falloff);
  }

  return r;
}
