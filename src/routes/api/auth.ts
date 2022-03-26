import { Router } from "express";
import authController from "../../controllers/auth";

const auth = Router();

auth.get("/login/success", authController.loginSuccess);
auth.get("/login/failed", authController.loginFailed);

auth.get("/google", authController.google);
auth.get("/google/callback", authController.googleCallback);

auth.post("/logout", authController.logout);

export = auth;
