const express = require('express');
const fetch = require('isomorphic-fetch');
const cors = require('cors');

const port = 4000;
// App id for PetFinder
const APP_ID = process.env.APP_ID;
const SECRET_ID = process.env.SECRET_ID;

// Initialize app and enable cross-origin resource sharing
const app = express();
app.use(cors());

// GET /
app.get('/', (req, res) => {
    // Fetch PetFinder Api
    fetch(`https://api.petfinder.com/v2/oauth2/token`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            client_id: APP_ID,
            client_secret: SECRET_ID,
            grant_type: 'client_credentials'
        })
    })
        .then(response => response.json())
        .then(data => {
            // Call res.json with an object to return data
            return res.json({
                pets: data,
                path: req.path,
                query: req.query
            });
        });
});

module.exports = app;

// Start the app on the provided port
app.listen(port, () => {
    console.log(`Service listening on port ${port}`);
});