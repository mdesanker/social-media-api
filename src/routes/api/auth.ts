import { Router } from "express";
import authController from "../../controllers/auth";

const auth = Router();

auth.get("/", authController.test);

auth.get("/google", authController.google);
auth.get("/google/callback", authController.googleCallback);

export = auth;
