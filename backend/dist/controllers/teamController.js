"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.getTeamById = exports.getTeams = void 0;
const Team_1 = __importDefault(require("../models/Team"));
const getTeams = async (_req, res) => {
    try {
        const teams = await Team_1.default.find();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching team members", error });
    }
};
exports.getTeams = getTeams;
const getTeamById = async (req, res) => {
    try {
        const team = await Team_1.default.findById(req.params.id);
        if (!team)
            return res.status(404).json({ message: "Team member not found" });
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching team member", error });
    }
};
exports.getTeamById = getTeamById;
const createTeam = async (req, res) => {
    try {
        const newTeam = new Team_1.default(req.body);
        const savedTeam = await newTeam.save();
        res.status(201).json(savedTeam);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating team member", error });
    }
};
exports.createTeam = createTeam;
const updateTeam = async (req, res) => {
    try {
        const updatedTeam = await Team_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeam)
            return res.status(404).json({ message: "Team member not found" });
        res.json(updatedTeam);
    }
    catch (error) {
        res.status(400).json({ message: "Error updating team member", error });
    }
};
exports.updateTeam = updateTeam;
const deleteTeam = async (req, res) => {
    try {
        const deletedTeam = await Team_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTeam)
            return res.status(404).json({ message: "Team member not found" });
        res.json({ message: "Team member deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting team member", error });
    }
};
exports.deleteTeam = deleteTeam;
