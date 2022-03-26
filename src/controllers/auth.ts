import { Request, Response, NextFunction } from "express";
import passport from "passport";

const CLIENT_URL =
  (process.env.CLIENT_URL as string) || (process.env.CLIENT_URL_DEV as string);

const test = (req: Request, res: Response) => {
  res.json({ msg: "Test route" });
};

const google = passport.authenticate("google", { scope: ["profile"] });

const googleCallback = [
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req: Request, res: Response) => {
    res.redirect("/login/success");
  },
];

export default { test, google, googleCallback };
