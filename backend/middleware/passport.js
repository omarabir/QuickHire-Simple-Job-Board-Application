const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL || "http://localhost:5000"}/api/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        if (!email)
          return done(new Error("No email from Google profile"), null);

        // Find existing user or create one
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            firstName:
              profile.name?.givenName || profile.displayName.split(" ")[0],
            lastName:
              profile.name?.familyName ||
              profile.displayName.split(" ").slice(1).join(" ") ||
              ".",
            email,
            googleId: profile.id,
            // No password needed for OAuth users
          });
        } else if (!user.googleId) {
          // Link Google ID to existing account
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

module.exports = passport;
