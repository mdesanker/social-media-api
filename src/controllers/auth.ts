import { Request, Response, NextFunction } from "express";

const test = (req: Request, res: Response) => {
  res.json({ msg: "Test route" });
};

export default { test };
