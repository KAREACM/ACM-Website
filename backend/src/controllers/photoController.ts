import { Request, Response } from "express";
import { Photo } from "../models/Photo";

export const getPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createPhoto = async (req: Request, res: Response) => {
  try {
    const photosData = Array.isArray(req.body) ? req.body : [req.body];
    const photos = await Photo.insertMany(photosData);
    res.status(201).json(photos);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};