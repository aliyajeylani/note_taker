const router = require('express').Router();
const util = require('util');
const fs = require('fs');
const uuid = require('uuid/v1');




// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);


const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );


const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};


// GET Route for retrieving all the notes
router.get('/api/notes', (req, res) => {

    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

});

// POST Route to write notes to db.json file

router.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to submit notes`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNotes = {
            title,
            text,
            id: uuid(),
        };


        readAndAppend(newNotes, './db/db.json');

        const response = {
            status: 'success',
            body: newNotes,
        };

        res.json(response);
    } else {
        res.json('Error in posting notes');
    }
});


module.exports = router;