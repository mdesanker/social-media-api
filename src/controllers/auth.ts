import { Request, Response, NextFunction } from "express";
import passport from "passport";

const CLIENT_URL =
  (process.env.CLIENT_URL as string) || (process.env.CLIENT_URL_DEV as string);

const loginSuccess = (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).json({
      user: req.user,
    });
  } else {
    return res.status(401).json({ msg: "Authentication failed" });
  }
};

const loginFailed = (req: Request, res: Response) => {
  res.status(401).json({ msg: "Authentication failed" });
};

const google = passport.authenticate("google", { scope: ["profile"] });

const googleCallback = [
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req: Request, res: Response) => {
    res.redirect(CLIENT_URL);
  },
];

const logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect(CLIENT_URL);
};

export default { loginSuccess, loginFailed, google, googleCallback, logout };
