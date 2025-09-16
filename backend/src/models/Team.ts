import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  designation: string;
  linkedin: string;
  image: string;
  profileLink?: string;
  showProfileButton?: boolean;
  category: string; 
}

const TeamSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    linkedin: { type: String, required: true },
    image: { type: String, required: true },
    profileLink: { type: String },
    showProfileButton: { type: Boolean, default: false },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITeam>("Team", TeamSchema);
