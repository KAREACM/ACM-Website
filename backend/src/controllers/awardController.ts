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
    const { image, title, description, year, category } = req.body;
    const award = new Award({ image, title, description, year, category });
    await award.save();
    res.status(201).json(award);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
