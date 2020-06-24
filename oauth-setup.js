const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/auth/facebook/callback`
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(obj, done) {
    done(null, obj)
})