import mongoose, { Schema } from "mongoose";
import { SystemIdentity } from "../../../interfaces/routerOS";

const SystemIdentitySchema: Schema = new mongoose.Schema({
  path: String,
  name: String
});

export const SystemIdentityModel = mongoose.model<SystemIdentity>(
  "SystemIdentity",
  SystemIdentitySchema
);
