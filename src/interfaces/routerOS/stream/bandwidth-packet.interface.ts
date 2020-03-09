import { Document } from "mongoose";
import { BandwidthPacket as RouterOSBandwidthPacket } from "../../../common/routerOS";

export interface BandwidthPacket extends Document, RouterOSBandwidthPacket {}
