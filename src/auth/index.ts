import passport from "passport";
import { Strategy as LoginStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { getUserByUserName, comparePassword, getUserById } from "./models";
import config from "../config";

export const passportLoginStrategy = () => {
  passport.use(
    "login",
    new LoginStrategy(
      { usernameField: "userName" },
      async (userName: string, password: string, done) => {
        const message = "Invalid Username or Password";
        try {
          const user = await getUserByUserName(userName);
          if (!user) {
            return done(false, false, { message });
          }
          const isMatch = await comparePassword(password, user.password);
          isMatch ? done(false, user) : done(false, false, { message });
        } catch (error) {
          console.log("error>>>>>>>", error);
          throw error;
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user: any, done) => {
    done(false, user);
  });
};

export const passportJwtStrategy = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SESSION_SECRET
  };
  passport.use(
    "jwt",
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        const user = await getUserById(jwtPayload.id);
        return done(false, user);
      } catch (error) {
        done(error, false);
      }
    })
  );
};
