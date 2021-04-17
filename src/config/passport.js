const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({    // Defino la estrategia que voy a utilizar
    usernameField: 'email',         // por default viene "username" pero como uso "email" lo cambio
    passwordField: 'password'
}, async (email, password, done) => {

    //Match user's email.
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'Email does not exist' });
    }
    // If user exists, then Match password.
    const match = await user.matchPassword(password); // if password match

    if (match) {
        return done(null, user);
    }
    return done(null, false, { message: 'Incorrect Password.' });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
        done(err, user);
    })
})