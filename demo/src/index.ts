import { WorldGenerator } from '../../src/index';
import { renderOnCanvas } from './render';
import { BiomeData, BIOMES } from './biomes';
import { ui } from './interface';

let savedSeed!: number[];

ui.buttons.generate?.addEventListener('click', () => {
  const generator = new WorldGenerator<BiomeData>({
    width: Number(ui.inputs.worldWidth?.value),
    height: Number(ui.inputs.worldHeight?.value),
  });

  const layer = generator.addLayer({
    frequencyChange: Number(ui.inputs.frequencyChange?.value),
    borderSmoothness: Number(ui.inputs.borderSmoothness?.value),
    heightRedistribution: Number(ui.inputs.heightRedistribution?.value),
  });

  for (const { params, data } of BIOMES) {
    layer.addBiome(params, data);
  }

  const seed = ui.inputs.resetSeed?.checked ? undefined : savedSeed;
  const world = generator.generate(seed);
  savedSeed = world.getSeed();

  renderOnCanvas(world);
});

ui.buttons.generate?.click();