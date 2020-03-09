import { Document } from "mongoose";
import { BandwidthTest as RouterOSBandwidthTest } from "../../../common/routerOS";

export interface BandwidthTest extends Document, RouterOSBandwidthTest {}
