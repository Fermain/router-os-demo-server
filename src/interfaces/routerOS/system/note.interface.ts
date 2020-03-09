import { Document } from "mongoose";
import { RouterOSSystemNote } from "../../../common/routerOS";

export interface SystemNote extends Document, RouterOSSystemNote {}
