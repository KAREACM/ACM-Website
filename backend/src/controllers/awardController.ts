import { Request, Response } from "express";
import { Award } from "../models/Award";

export const getAwards = async (req: Request, res: Response) => {
  try {
    const awards = await Award.find();
    res.json(awards);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createAward = async (req: Request, res: Response) => {
  try {
    const awardsData = Array.isArray(req.body) ? req.body : [req.body];
    const awards = await Award.insertMany(awardsData);
    res.status(201).json(awards);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};