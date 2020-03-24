const express = require('express');
const router = express.Router();


router.get('/test', (req, res) => {
    res.send('Hey from industry') //!works
})









module.exports = router;
