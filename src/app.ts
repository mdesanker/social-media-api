import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import connectDB from "./config/mongoConfig";
import session from "express-session";
import passport from "passport";

import authRouter from "./routes/api/auth";

const app = express();

connectDB();

app.use(
  cors({
    origin: [/\localhost/, /\mdesanker.github.io/],
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_KEY as string,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 6,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

const PORT = (process.env.PORT as string) || process.env.PORT_DEV;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
