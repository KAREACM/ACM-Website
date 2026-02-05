"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhoto = exports.getPhotos = void 0;
const Photo_1 = require("../models/Photo");
const getPhotos = async (req, res) => {
    try {
        const photos = await Photo_1.Photo.find();
        res.json(photos);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getPhotos = getPhotos;
const createPhoto = async (req, res) => {
    try {
        const photosData = Array.isArray(req.body) ? req.body : [req.body];
        const photos = await Photo_1.Photo.insertMany(photosData);
        res.status(201).json(photos);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createPhoto = createPhoto;
