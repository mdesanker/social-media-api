import { Router } from "express";
import userController from "../../controllers/user";

const user = Router();

user.get("/", userController.test);

export = user;
