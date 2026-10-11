import express from "express";
import { createProfile } from "../controllers/profileController";


const router=express.Router();

router.post('/profile',createProfile)

export default router;