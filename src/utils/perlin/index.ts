import type { WorldConfig } from "../../world/types";
import {
  PERLIN_AMP_FALLOFF,
  PERLIN_AVG_POWER,
  PERLIN_YWRAP,
  PERLIN_YWRAPB,
  PERLIN_ZWRAP,
} from "./const";
import type { PerlinParameters } from "./types";

export class Perlin {
  public static generate({ x, y, seed, config }: PerlinParameters): number {
    const {
      frequencyChange,
      borderSmoothness,
      heightAveraging,
      heightRedistribution,
      falloff,
    } = this.normalizeConfig(config);

    const size = seed.length - 1;
    const cx = (x / config.width) * frequencyChange;
    const cy = (y / config.height) * frequencyChange;

    let xi = Math.floor(cx);
    let yi = Math.floor(cy);
    let xf = cx - xi;
    let yf = cy - yi;

    let r = 0;
    let ampl = 0.5;

    for (let o = 0; o < borderSmoothness; o++) {
      let of = xi + (yi << PERLIN_YWRAPB);

      const rxf = this.scaledCosine(xf);
      const ryf = this.scaledCosine(yf);

      let n1 = seed[of & size];
      n1 += rxf * (seed[(of + 1) & size] - n1);

      let n2 = seed[(of + PERLIN_YWRAP) & size];
      n2 += rxf * (seed[(of + PERLIN_YWRAP + 1) & size] - n2);

      n1 += ryf * (n2 - n1);
      r += n1 * ampl;
      ampl *= PERLIN_AMP_FALLOFF;
      of += PERLIN_ZWRAP;

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

    if (heightAveraging) {
      if (r > 0.5) {
        r **= (1.5 - r) / PERLIN_AVG_POWER;
      } else if (r < 0.5) {
        r **= (1.5 - r) * PERLIN_AVG_POWER;
      }
    }

    r **= heightRedistribution;

    if (falloff > 0.0) {
      r *=
        this.heightFalloff(x, config.width, falloff) *
        this.heightFalloff(y, config.height, falloff);
    }

    return r;
  }

  private static clamp(
    value: number | undefined,
    defaultValue: number,
    limit: [number, number] = [0, 1]
  ) {
    return Math.max(limit[0], Math.min(limit[1], value ?? defaultValue));
  }

  private static scaledCosine(i: number): number {
    return 0.5 * (1.0 - Math.cos(i * Math.PI));
  }

  private static smootherStep(x: number) {
    return 3 * x ** 2 - 2 * x ** 3;
  }

  private static heightFalloff(
    offset: number,
    length: number,
    falloff: number
  ) {
    const radius = length / 2;
    const distance = Math.abs(radius - offset);
    const target = radius * (1 - falloff);

    if (distance < target) {
      return 1;
    }

    let x = (distance - target) / radius / (1 - target / radius);

    x = Math.min(1, Math.max(0, x));

    return 1 - this.smootherStep(x);
  }

  private static normalizeConfig(config: WorldConfig) {
    return {
      frequencyChange: Math.round(
        this.clamp(config.frequencyChange, 0.3) * 31 + 1
      ),
      borderSmoothness: Math.round(
        (1 - this.clamp(config.borderSmoothness, 0.5)) * 14 + 1
      ),
      heightRedistribution:
        2.0 - this.clamp(config.heightRedistribution, 1.0, [0.5, 1.5]),
      falloff: this.clamp(config.falloff, 0.0, [0.0, 0.9]),
      heightAveraging: config.heightAveraging ?? true,
    };
  }
}
