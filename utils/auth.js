const passport = require('koa-passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

/**
 * Serialize user
 *
 * @param object        User info
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Deserialize user from session
 *
 * @param integer        User id
 * @returns
 */
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

/**
 * Localstrategy of Passport.js
 *
 * @param string        Username
 * @param string        password
 * @returns
 */
const LocalStrategy = require('passport-local').Strategy;
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne(username);
    if (user) {
      bcrypt.compare(password, user.password, (error, response) => {
        if (response) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } else {
      done(null, false);
    }
  })
);

/**
 * google strategy of Passport.js
 *
 * @param
 * @returns
 */
const GoogleStrategy = require('passport-google-auth').Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/users/auth/google/callback'
    },
    async (token, tokenSecret, profile, done) => {
      // Retrieve user from database, if exists
      const user = await User.findOne(profile.emails[0].value);
      if (user) {
        done(null, user);
      } else {
        // If user not exist, create it
        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          password: 'password-is-from-google',
          email: profile.emails[0].value
        };
        const createdUser = await User.create(newUser);
        if (createdUser) {
          done(null, createdUser);
        } else {
          done(null, false);
        }
      }
    }
  )
);

/**
 * Facebook strategy of Passport.js
 *
 * @param
 * @returns
 */
const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        'http://localhost:' + (process.env.PORT || 3000) + '/users/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'name', 'photos', 'email']
    },
    async (token, tokenSecret, profile, done) => {
      // Retrieve user from database, if exists
      const user = await User.findOne(profile.emails[0].value);
      if (user) {
        done(null, user);
      } else {
        // If user not exist, create it
        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          password: 'password-is-from-google',
          email: profile.emails[0].value
        };
        const createdUser = await User.create(newUser);
        if (createdUser) {
          done(null, createdUser);
        } else {
          done(null, false);
        }
      }
    }
  )
);

/**
 * Twitter strategy of Passport.js
 *
 * @param
 * @returns
 */
const TwitterStrategy = require('passport-twitter').Strategy;
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL:
        'http://localhost:' + (process.env.PORT || 3000) + '/users/auth/twitter/callback',
      includeEmail: true
    },
    async (token, tokenSecret, profile, done) => {
      // Retrieve user from database, if exists
      const user = await User.findOne(profile.emails[0].value);
      if (user) {
        done(null, user);
      } else {
        // If user not exist, create it
        const newUser = {
          firstName: profile.username,
          lastName: profile.username,
          password: 'password-is-from-twitter',
          email: profile.emails[0].value
        };
        const createdUser = await User.create(newUser);
        if (createdUser) {
          done(null, createdUser);
        } else {
          done(null, false);
        }
      }
      console.log(profile);
    }
  )
);

/**
 * LinkedIn strategy of Passport.js
 *
 * @param
 * @returns
 */
const LinkedInStrategy = require('passport-linkedin').Strategy;
passport.use(
  new LinkedInStrategy(
    {
      consumerKey: process.env.LINKEDIN_API_KEY,
      consumerSecret: process.env.LINKEDIN_SECRET_KEY,
      callbackURL:
        'http://localhost:' + (process.env.PORT || 3000) + '/users/auth/linkedin/callback'
    },
    async (token, tokenSecret, profile, done) => {
      // Retrieve user from database, if exists
      const user = await User.findOne(profile.emails[0].value);
      if (user) {
        done(null, user);
      } else {
        // If user not exist, create it
        const newUser = {
          firstName: profile.username,
          lastName: profile.username,
          password: 'password-is-from-linkedin',
          email: profile.emails[0].value
        };
        const createdUser = await User.create(newUser);
        if (createdUser) {
          done(null, createdUser);
        } else {
          done(null, false);
        }
      }
    }
  )
);
