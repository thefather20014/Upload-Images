const { Router } = require('express');
const path = require('path');

const router = Router();

// Routes
router.get('/', (req, res) => {
    res.render('Index');
});

router.post('/upload', (req, res) => {
    console.log(req.file);
    res.send('Uploaded!');
});

module.exports = router;
