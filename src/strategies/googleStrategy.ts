import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import User, { IUser } from "../models/User";
import { DateTime } from "luxon";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK as string,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);

      try {
        // Check if user exists
        const existingUser = await User.findOne({
          provider: "google",
          googleId: profile.id,
        });

        if (existingUser) {
          return cb(null, existingUser);
        }

        // Create new user
        const newUser = new User<IUser>({
          provider: "google",
          googleId: profile.id,
          firstName: profile._json.given_name!,
          lastName: profile._json.family_name!,
          avatar: profile._json.picture!,
          date: DateTime.now(),
        });

        await newUser.save();
        return cb(null, newUser);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
