const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {        // to use middleware, we include it as second param
    res.render('Login',{
        layout: 'login',
    })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {  
    try {
        const stories = await Story.find({ user: req.user.id }).lean()  // inorder to pass this to hbs, need to use lean
        res.render('dashboard', {
            name: req.user.firstName,    // so we can access user's first name in our dashboard
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router