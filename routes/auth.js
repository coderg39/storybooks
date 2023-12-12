const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Login/Landing page
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google',{ failureRedirect: '/' }),
    (req, res) => {
    res.redirect('/dashboard')
})

// @desc    Logout user
// @route   /auth/logout
// router.get('/logout', (req, res) => {
//     req.logout()        // will automatically have access to a logout method throught Passport
//     res.redirect('/')   // redirect to home page
// })

router.get('/logout', (req, res, next) => {
    req.logout((error)=>{
        if (error) {return next(error)}
    });  
    res.redirect('/')
})

module.exports = router