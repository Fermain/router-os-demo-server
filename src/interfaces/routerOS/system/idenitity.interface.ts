import { Document } from "mongoose";
import { RouterOSSystemIdentity } from "../../../common/routerOS";

export interface SystemIdentity extends Document, RouterOSSystemIdentity {}
