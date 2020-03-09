import { Document } from "mongoose";
import { RouterOSSystemIdentity } from "../../../common/routerOS";

export interface SystemResource extends Document, RouterOSSystemIdentity {}
