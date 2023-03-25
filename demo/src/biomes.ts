import { WorldBiomeParams } from '../../src';

export type BiomeData = {
  name: string
  color: string
};

export const BIOMES: Array<{
  params: WorldBiomeParams
  data: BiomeData
}> = [
  {
    params: {
      lowerBound: 0.0,
      upperBound: 0.2,
    },
    data: {
      name: 'WATER',
      color: 'dodgerblue',
    },
  },
  {
    params: {
      lowerBound: 0.2,
      upperBound: 0.3,
    },
    data: {
      name: 'SAND',
      color: '#edd665',
    },
  },
  {
    params: {
      lowerBound: 0.3,
      upperBound: 0.7,
    },
    data: {
      name: 'GRASS',
      color: '#9bd138',
    },
  },
  {
    params: {
      lowerBound: 0.7,
      upperBound: 0.9,
    },
    data: {
      name: 'MOUNT',
      color: 'gray',
    },
  },
  {
    params: {
      lowerBound: 0.9,
    },
    data: {
      name: 'SNOW',
      color: 'white',
    },
  },
];
