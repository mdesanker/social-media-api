import { Request, Response, NextFunction } from "express";

const test = (req: Request, res: Response) => {
  res.json({ msg: "This is just a test" });
};

export default { test };
