import { Document } from "mongoose";
import { RouterOSSystemPackage } from "../../../common/routerOS";

export interface SystemPackage extends Document, RouterOSSystemPackage {}
