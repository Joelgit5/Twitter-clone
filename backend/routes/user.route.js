import express from "express";
const router = express.Router();

import { protectRoute } from "../middleware/protectRoute.js";
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
} from "../controllers/user.controller.js";
// Imports End

router.get("/profile/:username", protectRoute, getUserProfile);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/update", protectRoute, updateUser);

export default router;
