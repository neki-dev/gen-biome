export const ui = {
  screen: document.getElementById('screen') as HTMLCanvasElement,
  inputs: {
    resetSeed: document.querySelector<HTMLInputElement>('[name=resetSeed]'),
    frequencyChange: document.querySelector<HTMLInputElement>('[name=frequencyChange]'),
    borderSmoothness: document.querySelector<HTMLInputElement>('[name=borderSmoothness]'),
    heightRedistribution: document.querySelector<HTMLInputElement>('[name=heightRedistribution]'),
    worldWidth: document.querySelector<HTMLInputElement>('[name=worldWidth]'),
    worldHeight: document.querySelector<HTMLInputElement>('[name=worldHeight]'),
  },
  buttons: {
    generate: document.getElementById('generate'),
  },
};
