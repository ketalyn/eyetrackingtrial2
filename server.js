const express = require('express');
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Endpoint to proxy requests to Twitter API
app.get('/trends', async (req, res) => {
    try {
        const response = await fetch('https://api.twitter.com/1.1/trends/place.json?id=1', {
            headers: {
                Authorization: 'Bearer WCZd9n5WUovQXi3EVQItL3Rhg' // Replace with your actual Twitter API access token
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching trending topics:', error);
        res.status(500).json({ error: 'Failed to fetch trending topics' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
