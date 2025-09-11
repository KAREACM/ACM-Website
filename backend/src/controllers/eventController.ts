import { Request, Response } from "express";
import Event, { IEvent } from "../models/Event";

// Categorize events into upcoming, ongoing, past
const categorizeEvents = (events: IEvent[]) => {
  const now = new Date();
  const upcoming: IEvent[] = [];
  const ongoing: IEvent[] = [];
  const past: IEvent[] = [];

  events.forEach((event) => {
    const [hours, minutes] = event.time.split(/[: ]/);
    const isPM = event.time.includes("PM");
    let eventHour = parseInt(hours);
    if (isPM && eventHour !== 12) eventHour += 12;

    const [year, month, day] = event.date.split("-").map(Number);
    const eventDate = new Date(year, month - 1, day, eventHour, parseInt(minutes));

    if (eventDate > now) upcoming.push(event);
    else if (eventDate.toDateString() === now.toDateString()) ongoing.push(event);
    else past.push(event);
  });

  return { upcoming, ongoing, past };
};

// GET all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ date: 1, time: 1 });
    res.json(categorizeEvents(events));
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", err });
  }
};

// POST new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Error creating event", err });
  }
};
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully", deletedEvent });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", err });
  }
};


export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document
      runValidators: true, // validate before updating
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated successfully", updatedEvent });
  } catch (err) {
    res.status(500).json({ message: "Error updating event", err });
  }
};
