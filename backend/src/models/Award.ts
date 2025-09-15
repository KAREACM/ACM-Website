import { Schema, model, Document } from "mongoose";

export interface IAward extends Document {
  image: string;
  title: string;
  description?: string;
  year: string;
  category: string;
}

const awardSchema = new Schema<IAward>(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    year: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const Award = model<IAward>("Award", awardSchema);
