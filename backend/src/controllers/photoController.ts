import { Request, Response } from "express";
import { Photo } from "../models/photo";

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
    const { url, alt } = req.body;
    const photo = new Photo({ url, alt });
    await photo.save();
    res.status(201).json(photo);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
