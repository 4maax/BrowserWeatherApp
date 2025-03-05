const express = require('express');
const fetch = require('node-fetch').default;
require('dotenv').config(); // reading the .env file containing the api key

const app = express();
const port = 3000;

app.use(express.static('public')); // use the files from "public" in the browser


app.get('/weather', async (req, res) => {
    const city = req.query.city; // getting the city from user input
    const apiKey = process.env.API_KEY; // getting apiKey from .env
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(currentWeatherUrl); // fetching weather data from the url
        const data = await response.json();
        res.json(data); // sending the weather data back to the browser as JSON so script.js can show it
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});


app.get('/forecast', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching forecast data:", error);
        res.status(500).json({ error: 'Error fetching forecast data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});