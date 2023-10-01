const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// desc     get all scores
// route    GET /scores/
router.get('/', async (req, res) => {
    try {
        const scores = await Score.find();
        res.json(scores);
    } catch (err) {
        res.status(500).json({ message: err.message }); // 500 server error
    }
});


// desc     get one
// route    GET /scores/:id
router.get('/:id', getScore, async (req, res) => {
    res.json(res.score);
});


// desc     add score
// route    POST /scores/
router.post('/', async (req, res) => {
    const score = new Score({
        name: req.body.name,
        score: req.body.score,
        date: req.body.date
    });

    try {
        const newScore = await score.save();
        res.status(201).json(newScore); // 201 successfully created an object
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 something wrong with user's input
    }
});


// desc     update personal record
// route    PATCH /scores/:id
router.patch('/:id', getScore, async (req, res) => {
    if (req.body.name) {
        res.score.name = req.body.name;
    }
    if (req.body.score) {
        res.score.score = req.body.score;
    }
    try {
        const updatedScore = await res.score.save();
        res.json(updatedScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// desc     delete a score
// route    DELETE /score/:id
router.delete('/:id', getScore, async (req, res) => {
    try {
        await res.score.deleteOne();
        res.json({ message: `successfully removed score` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// middleware
async function getScore (req, res, next) {
    let score;
    try {
        score = await Score.findById(req.params.id);
        if (!score) {
            return res.status(404).json({ message: `Cannot find score` }); // not found
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.score = score;
    next();
}

module.exports = router;