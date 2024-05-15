const express = require('express');
const app =express();
const path = require('path');

const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

app.use(cors({
    origin : 'http://localhost:3000',
}));

app.use(morgan('combined'));


app.use(express.json());
app.use(express.static(path.join(__dirname, "..","public",)))

app.use("/planets",planetsRouter);
app.use("/launches",launchesRouter);



module.exports = app;