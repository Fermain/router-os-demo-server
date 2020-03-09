import { Document } from "mongoose";
import { RouterOSSystemHardware } from "../../../common/routerOS";

export interface SystemHardware extends Document, RouterOSSystemHardware {}
