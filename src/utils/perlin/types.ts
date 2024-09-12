import type { WorldConfig } from "../../world/types";

/**
 * @internal
 */
export type PerlinParameters = {
  seed: number[]
  config: WorldConfig
  x: number
  y: number
};
