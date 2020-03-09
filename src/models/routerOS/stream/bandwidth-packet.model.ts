import mongoose, { Schema } from "mongoose";
import { BandwidthPacket } from "../../../interfaces/routerOS";

const BandwidthPacketSchema: Schema = new mongoose.Schema({
  path: String,
  time: String,
  date: String,
  timeZoneAutodetect: Boolean,
  timeZoneName: String,
  gmtOffset: String,
  dstActive: Boolean
});

export const BandwidthPacketModel = mongoose.model<BandwidthPacket>(
  "BandwidthPacket",
  BandwidthPacketSchema
);
