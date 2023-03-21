import { World } from '../../src/index';
import { ui } from './interface';

const ctx = ui.screen.getContext('2d') as CanvasRenderingContext2D;
const tileSize = 2;

export function renderOnCanvas(world: World) {

  ui.screen.width = world.width * tileSize;
  ui.screen.height = world.height * tileSize;

  for (let y = 0; y < world.height; y++) {
    for (let x = 0; x < world.width; x++) {
      const biome = world.getAt({ x, y });

      ctx.fillStyle = biome?.color ?? 'purple';
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}
