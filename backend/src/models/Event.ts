import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: string;   // "YYYY-MM-DD"
  time: string;   // "HH:MM AM/PM"
  location: string;
  image?: string;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  date: String,
  time: String,
  location: String,
  image: String,
});

export default mongoose.model<IEvent>("Event", EventSchema);
