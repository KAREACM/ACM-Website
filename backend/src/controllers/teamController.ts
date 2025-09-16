import { Request, Response } from "express";
import Team from "../models/Team";

export const getTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team members", error });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team member not found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team member", error });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(400).json({ message: "Error creating team member", error });
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeam) return res.status(404).json({ message: "Team member not found" });
    res.json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: "Error updating team member", error });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) return res.status(404).json({ message: "Team member not found" });
    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting team member", error });
  }
};
