// middleware is a function that has access to request and response objs
module.exports = {
    ensureAuth: function (req, res, next) {       // next is just a function to call next piece of middleware
        if (req.isAuthenticated()) {              // if they're logged in, then they can continue on
            return next()
        } else {
            res.redirect('/')                     // else, redirect to login page
        }
    },
    ensureGuest: function (req, res, next) {      // want logged in users to go to dashboard, not login page
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}