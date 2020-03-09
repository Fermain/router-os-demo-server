export interface BandwidthPacket {
  current: number;
  average: number;
  ".section"?: number;
  section?: number;
  currentFormatted?: string;
}

export interface BandwidthTest {
  results: any[];
  command: string;
  params: object;
  timestamp: string;
}

export interface PingTestPacket {
  status: string;
  "time-remaining"?: string;
  timeRemaining?: string;
  "ping-min-avg-max"?: string;
  pingMinAvgMax?: string;
  "jitter-min-avg-max"?: string;
  jitterMinAvgMax?: string;
  loss: string;
  ".section"?: number;
  section?: number;
}
