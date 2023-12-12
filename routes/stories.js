const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc    Show add page
// @route   GET /
router.get('/add', ensureAuth, (req, res) => {        // to use middleware, we include it as second param
    res.render('stories/add')
})

// @desc    Process add form
// @route   POST /stories
router.post('/', ensureAuth, async (req, res) => {        // to use middleware, we include it as second param
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


// @desc    Show all stories
// @route   GET /stories/add
router.get('/', ensureAuth, async (req, res) => {        // to use middleware, we include it as second param
    try {
        const stories = await Story.find({ status: 'public' })  // finding any stories that have a status of public
        .populate('user')               
        .sort({ createdAt: 'desc' })
        .lean()
        res.render('stories/index', {
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {        // to use middleware, we include it as second param
    const story = await Story.findOne({
        _id: req.params.id
    }).lean()

    if(!story) {
        return res.render('error/404')
    }

    if (story.user != req.user.id) {
        res.redirect('/stories')
    } else {
        res.render('stories/edit', {
            story,
        })
    }
})

module.exports = router