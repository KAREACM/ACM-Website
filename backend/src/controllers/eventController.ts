import { Request, Response } from "express";
import Event, { IEvent } from "../models/Event";

// Categorize events into upcoming, ongoing, past
const categorizeEvents = (events: IEvent[]) => {
  const now = new Date();
  const upcoming: IEvent[] = [];
  const ongoing: IEvent[] = [];
  const past: IEvent[] = [];

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    if (eventDate > now) {
      upcoming.push(event);
    } else if (eventDate.toDateString() === now.toDateString()) {
      ongoing.push(event);
    } else {
      past.push(event);
    }
  });

  return { upcoming, ongoing, past };
};

// CREATE
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: "Error creating event", error });
  }
};

// READ (all categorized)
export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(categorizeEvents(events));
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// READ (single by id)
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

// UPDATE
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: "Error updating event", error });
  }
};

// DELETE
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
