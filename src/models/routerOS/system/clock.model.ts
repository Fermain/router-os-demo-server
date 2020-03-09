import mongoose, { Schema } from "mongoose";
import { SystemClock } from "../../../interfaces/routerOS";

const SystemClockSchema: Schema = new mongoose.Schema({
  path: String,
  time: String,
  date: String,
  timeZoneAutodetect: Boolean,
  timeZoneName: String,
  gmtOffset: String,
  dstActive: Boolean
});

export const SystemClockModel = mongoose.model<SystemClock>(
  "SystemClock",
  SystemClockSchema
);
