const router = require('express').Router();
const apiRouter = require('./api');
const htmlRouter = require('./html');

router.use('/', apiRouter);
router.use('/', htmlRouter);


module.exports = router;