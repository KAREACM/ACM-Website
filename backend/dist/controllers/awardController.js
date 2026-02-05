"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAward = exports.getAwards = void 0;
const Award_1 = require("../models/Award");
const getAwards = async (req, res) => {
    try {
        const awards = await Award_1.Award.find();
        res.json(awards);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAwards = getAwards;
const createAward = async (req, res) => {
    try {
        const awardsData = Array.isArray(req.body) ? req.body : [req.body];
        const awards = await Award_1.Award.insertMany(awardsData);
        res.status(201).json(awards);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createAward = createAward;
