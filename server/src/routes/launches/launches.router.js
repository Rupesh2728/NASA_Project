const express = require('express');
const { HttpgetAllLaunches, HttpAddnewLaunch, HttpAbortLaunch} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get("/",HttpgetAllLaunches);

launchesRouter.post("/",HttpAddnewLaunch);

launchesRouter.delete("/:id",HttpAbortLaunch)

module.exports = launchesRouter;