import { WorldGenerator, WorldLayer, WorldBiome } from '../../src/index';
import { renderOnCanvas } from './render';
import { BIOMES } from './biomes';
import { ui } from './interface';

let savedSeed!: number[];

ui.buttons.generate?.addEventListener('click', () => {
  const generator = new WorldGenerator({
    width: Number(ui.inputs.worldWidth?.value),
    height: Number(ui.inputs.worldHeight?.value),
  });

  const layer = new WorldLayer({
    frequencyChange: Number(ui.inputs.frequencyChange?.value),
    borderSmoothness: Number(ui.inputs.borderSmoothness?.value),
    heightRedistribution: Number(ui.inputs.heightRedistribution?.value),
  });
  generator.addLayer(layer);

  for (const { params, data } of BIOMES) {
    const biome = new WorldBiome(params, data);
    layer.addBiome(biome);
  }

  const seed = ui.inputs.resetSeed?.checked ? undefined : savedSeed;
  const world = generator.generate(seed);
  savedSeed = world.getSeed();

  renderOnCanvas(world);
});

ui.buttons.generate?.click();