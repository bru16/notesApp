const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { //Passport method. Verify user session.
        return next();
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/users/login');
}

module.exports = helpers;