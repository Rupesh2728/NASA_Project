const express = require('express');

const planetsRouter = express.Router();


const {HttpgetAllPlanets} = require("./planets.controller")

planetsRouter.get("/",HttpgetAllPlanets);

module.exports = planetsRouter;