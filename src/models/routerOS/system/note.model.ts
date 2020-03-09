import mongoose, { Schema } from "mongoose";
import { SystemNote } from "../../../interfaces/routerOS";

const SystemNoteSchema: Schema = new mongoose.Schema({
  path: String,
  showAtLogin: Boolean,
  note: String
});

export const SystemNoteModel = mongoose.model<SystemNote>(
  "SystemNote",
  SystemNoteSchema
);
