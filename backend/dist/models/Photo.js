"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const mongoose_1 = require("mongoose");
const photoSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    alt: { type: String, required: true },
}, { timestamps: true });
exports.Photo = (0, mongoose_1.model)("Photo", photoSchema);
