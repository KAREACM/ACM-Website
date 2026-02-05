"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getEvents = exports.createEvent = void 0;
const Event_1 = __importDefault(require("../models/Event"));
// Categorize events into upcoming, ongoing, pas
// t
const categorizeEvents = (events) => {
    const now = new Date();
    const upcoming = [];
    const ongoing = [];
    const past = [];
    events.forEach((event) => {
        const eventDate = new Date(event.date);
        if (eventDate > now) {
            upcoming.push(event);
        }
        else if (eventDate.toDateString() === now.toDateString()) {
            ongoing.push(event);
        }
        else {
            past.push(event);
        }
    });
    return { upcoming, ongoing, past };
};
// CREATE
const createEvent = async (req, res) => {
    try {
        const event = new Event_1.default(req.body);
        await event.save();
        res.status(201).json(event);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating event", error });
    }
};
exports.createEvent = createEvent;
// READ (all categorized)
const getEvents = async (_req, res) => {
    try {
        const events = await Event_1.default.find();
        res.json(categorizeEvents(events));
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};
exports.getEvents = getEvents;
// READ (single by id)
const getEventById = async (req, res) => {
    try {
        const event = await Event_1.default.findById(req.params.id);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        res.json(event);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching event", error });
    }
};
exports.getEventById = getEventById;
// UPDATE
const updateEvent = async (req, res) => {
    try {
        const event = await Event_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        res.json(event);
    }
    catch (error) {
        res.status(400).json({ message: "Error updating event", error });
    }
};
exports.updateEvent = updateEvent;
// DELETE
const deleteEvent = async (req, res) => {
    try {
        const event = await Event_1.default.findByIdAndDelete(req.params.id);
        if (!event)
            return res.status(404).json({ message: "Event not found" });
        res.json({ message: "Event deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};
exports.deleteEvent = deleteEvent;
