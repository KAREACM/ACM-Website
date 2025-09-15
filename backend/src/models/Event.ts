import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  id: string;
  title: string;
  description: string;
  date: Date | string;
  image: string;
  startDate: Date;
  endDate: Date;
  venue: string;
  eventType: "hackathon" | "workshop" | "talk" | "seminar" | "other";
  isFree: boolean;
  price?: number;
  status: "upcoming" | "ongoing" | "past";
  tags: string[];
  registrations: number;
  maxCapacity: number;
  organizers: string[];
  visibility: "internal" | "external";
}

const EventSchema: Schema = new Schema<IEvent>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    venue: { type: String, required: true },
    eventType: {
      type: String,
      enum: ["hackathon", "workshop", "talk", "seminar", "other"],
      required: true,
    },
    isFree: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "past"],
      required: true,
    },
    tags: { type: [String], default: [] },
    registrations: { type: Number, default: 0 },
    maxCapacity: { type: Number, required: true },
    organizers: { type: [String], default: [] },
    visibility: { type: String, enum: ["internal", "external"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>("Event", EventSchema);
