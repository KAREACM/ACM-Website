import { Schema, model, Document } from "mongoose";

export interface IPhoto extends Document {
  url: string;
  alt: string;
}

const photoSchema = new Schema<IPhoto>(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { timestamps: true }
);

export const Photo = model<IPhoto>("Photo", photoSchema);
