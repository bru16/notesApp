const userCtrl = {};
const User = require('../models/User');
const passport = require('passport');

//signUp-registro
userCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

userCtrl.signup = async (req, res) => {
    const errors = [];  // array de errores.
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Password do not match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be atleast 4 characters' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email });
    }
    else {
        const emailUser = await User.findOne({ email });   //si no existen errores, verifico que no exista un user con mismo email, caso contrario doy error.
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }
        else {
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);       // Cifro la password.
            await newUser.save();
            req.flash('success_msg', 'Congratulations! You are registered');
            res.redirect('/users/login');
        }
    }
};

//login
userCtrl.renderLogInForm = (req, res) => {
    res.render('users/login');
};

userCtrl.login = passport.authenticate('local', {
    failureRedirect: '/users/login',    // si hubo error, redirecciono al login.
    successRedirect: '/notes',          // si fue satisfactorio el login, voy a notes.
    failureFlash: true
});

userCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out!');
    res.redirect('/users/login')
};

module.exports = userCtrl;