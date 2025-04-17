export interface CPUData {
  name: string;
  score: number;
}

export interface GPUData {
  name: string;
  vramGB: number;
}

export interface SystemRequirements {
  cpuScore: number;
  vramGB: number;
  memoryGB: number;
  storageGB: number;
}
