const input = (name: string) => document.querySelector<HTMLInputElement>(`[name=${name}]`);

export const ui = {
  screen: document.getElementById('screen') as HTMLCanvasElement,
  inputs: {
    resetSeed: input('resetSeed'),
    frequencyChange: input('frequencyChange'),
    borderSmoothness: input('borderSmoothness'),
    heightRedistribution: input('heightRedistribution'),
    falloff: input('falloff'),
    heightAveraging: input('heightAveraging'),
    worldWidth: input('worldWidth'),
    worldHeight: input('worldHeight'),
  },
  buttons: {
    generate: document.getElementById('generate'),
  },
};
