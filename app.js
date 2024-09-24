// app.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle chat messages
app.post('/chat', async (req, res) => {
    const userInput = req.body.message;

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: userInput }
                ]
            }
        ]
    };

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            requestBody,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // Log the entire response data for debugging
        console.log(response.data);

        // Adjust based on actual response structure
        const content = response.data.candidates; // Change this if necessary

        res.json({ response: content });
    } catch (error) {
        console.error('Error calling the API:', error);
        res.status(500).json({ error: 'Internal Server Error ' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});