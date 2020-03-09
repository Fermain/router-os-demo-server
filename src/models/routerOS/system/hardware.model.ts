import mongoose, { Schema } from "mongoose";
import { SystemHardware } from "../../../interfaces/routerOS";

const SystemHardwareSchema: Schema = new mongoose.Schema({
  path: String,
  multiCpu: Boolean
});

export const SystemHardwareModel = mongoose.model<SystemHardware>(
  "SystemHardware",
  SystemHardwareSchema
);
