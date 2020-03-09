import mongoose, { Schema } from "mongoose";
import { SystemResource } from "../../../interfaces/routerOS";

const SystemResourceSchema: Schema = new mongoose.Schema({
  path: String,
  uptime: String,
  version: String,
  buildTime: String,
  freeMemory: Number,
  totalMemory: Number,
  cpu: String,
  cpuCount: Number,
  cpuFrequency: Number,
  cpuLoad: Number,
  freeHddSpace: Number,
  totalHddSpace: Number,
  writeSectSinceReboot: Number,
  writeSectTotal: Number,
  architectureName: String,
  boardName: String,
  platform: String
});

export const SystemResourceModel = mongoose.model<SystemResource>(
  "SystemResource",
  SystemResourceSchema
);
