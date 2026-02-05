"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const awardController_1 = require("../controllers/awardController");
const router = (0, express_1.Router)();
router.get("/", awardController_1.getAwards);
router.post("/", awardController_1.createAward);
exports.default = router;
