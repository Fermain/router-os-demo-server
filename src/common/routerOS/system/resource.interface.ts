export interface RouterOSSystemResource extends Document {
  path: string;
  uptime: string;
  version: string;
  buildTime: string;
  freeMemory: number;
  totalMemory: number;
  cpu: string;
  cpuCount: number;
  cpuFrequency: number;
  cpuLoad: number;
  freeHddSpace: number;
  totalHddSpace: number;
  writeSectSinceReboot: number;
  writeSectTotal: number;
  architectureName: string;
  boardName: string;
  platform: string;
}
