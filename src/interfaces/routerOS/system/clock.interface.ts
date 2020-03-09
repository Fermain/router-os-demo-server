import { Document } from "mongoose";
import { RouterOSSystemClock } from "../../../common/routerOS";

export interface SystemClock extends Document, RouterOSSystemClock {}
