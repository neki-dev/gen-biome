import type { WorldBiomeConfig } from "../../src";

export type BiomeData = {
  name: string
  color: string
};

export const BIOMES: Array<{
  params: WorldBiomeConfig
  data: BiomeData
}> = [
  {
    params: { upperBound: 0.08 },
    data: {
      name: 'Liquid',
      color: '#4292c4',
    },
  },
  {
    params: { lowerBound: 0.08, upperBound: 0.11 },
    data: {
      name: 'Liquid',
      color: '#4c9ccd',
    },
  },
  {
    params: { lowerBound: 0.11, upperBound: 0.14 },
    data: {
      name: 'Liquid',
      color: '#51a5d8',
    },
  },
  {
    params: { lowerBound: 0.14, upperBound: 0.17 },
    data: {
      name: 'Liquid',
      color: '#56aade',
    },
  },
  {
    params: { lowerBound: 0.17, upperBound: 0.22 },
    data: {
      name: 'Coast',
      color: '#c5ac6d',
    },
  },
  {
    params: { lowerBound: 0.22, upperBound: 0.25 },
    data: {
      name: 'Coast',
      color: '#ccb475',
    },
  },
  {
    params: { lowerBound: 0.25, upperBound: 0.28 },
    data: {
      name: 'Coast',
      color: '#d2ba7d',
    },
  },
  {
    params: { lowerBound: 0.28, upperBound: 0.34 },
    data: {
      name: 'Fields',
      color: '#67c72b',
    },
  },
  {
    params: { lowerBound: 0.34, upperBound: 0.46 },
    data: {
      name: 'Fields',
      color: '#5dbc21',
    },
  },
  {
    params: { lowerBound: 0.46, upperBound: 0.65 },
    data: {
      name: 'Fields',
      color: '#56ae1e',
    },
  },
  {
    params: { lowerBound: 0.65, upperBound: 0.72 },
    data: {
      name: 'Mounts',
      color: '#333333',
    },
  },
  {
    params: { lowerBound: 0.72, upperBound: 0.79 },
    data: {
      name: 'Mounts',
      color: '#444444',
    },
  },
  {
    params: { lowerBound: 0.79 },
    data: {
      name: 'Mounts',
      color: '#555555',
    },
  },
];
