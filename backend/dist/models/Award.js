"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Award = void 0;
const mongoose_1 = require("mongoose");
const awardSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    year: { type: String, required: true },
    category: { type: String, required: true },
}, { timestamps: true });
exports.Award = (0, mongoose_1.model)("Award", awardSchema);
