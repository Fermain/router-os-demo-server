import mongoose, { Schema } from "mongoose";
import { BandwidthTest } from "../../../interfaces/routerOS";

const BandwidthTestSchema: Schema = new mongoose.Schema({
  results: Array,
  command: String,
  params: Object,
  timestamp: String
});

export const BandwidthTestModel = mongoose.model<BandwidthTest>(
  "BandwidthTest",
  BandwidthTestSchema
);
