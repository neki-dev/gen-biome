import { WorldGenerator } from "../../src";
import type { BiomeData } from "./biomes";
import { BIOMES } from "./biomes";
import { ui } from "./interface";

const ctx = ui.screen.getContext("2d") as CanvasRenderingContext2D;
let savedSeed!: number[];

function generateAndRenderWorld() {
  /**
   * PREPARE
   */

  const generator = new WorldGenerator<BiomeData>({
    width: Number(ui.inputs.worldWidth?.value),
    height: Number(ui.inputs.worldHeight?.value),
    frequencyChange: Number(ui.inputs.frequencyChange?.value),
    borderSmoothness: Number(ui.inputs.borderSmoothness?.value),
    heightRedistribution: Number(ui.inputs.heightRedistribution?.value),
    falloff: Number(ui.inputs.falloff?.value),
    heightAveraging: ui.inputs.heightAveraging?.checked,
  });

  for (const { params, data } of BIOMES) {
    generator.addBiome(params, data);
  }

  /**
   * GENERATE
   */

  const world = generator.generate({
    seed: ui.inputs.resetSeed?.checked ? undefined : savedSeed,
  });

  savedSeed = world.seed;

  /**
   * RENDER
   */

  const tileSize = Number(ui.inputs.tileSize?.value);

  ui.screen.width = world.width * tileSize;
  ui.screen.height = world.height * tileSize;

  world.each((position, biome) => {
    ctx.fillStyle = biome.color;
    ctx.fillRect(position.x * tileSize, position.y * tileSize, tileSize, tileSize);
  });
}

ui.buttons.generate?.addEventListener("click", generateAndRenderWorld);
generateAndRenderWorld();
