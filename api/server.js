const express = require("express");
const actionRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");

const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

module.exports = server;
