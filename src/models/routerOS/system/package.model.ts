import mongoose, { Schema } from "mongoose";
import { SystemPackage } from "../../../interfaces/routerOS";

const SystemPackageSchema: Schema = new mongoose.Schema({
  path: String,
  id: String,
  name: String,
  version: String,
  buildTime: String,
  scheduled: String,
  bundle: String,
  disabled: Boolean
});

export const SystemPackageModel = mongoose.model<SystemPackage>(
  "SystemPackage",
  SystemPackageSchema
);
