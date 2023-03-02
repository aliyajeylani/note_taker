const router = require('express').Router();
const store = require('../db/store');

// GET Route for retrieving all the notes
router.get('/api/notes', (req, res) => {

    store.getNotes();

});

// POST Route to write notes to db.json file

router.post('/api/notes', (req, res) => {

    store.writeNotes();

});


module.exports = router;