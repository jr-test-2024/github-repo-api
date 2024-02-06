const express = require('express');
const startServer = require('./src/server');

const githubClient = require('./src/github/client')();
const githubService = require('./src/github')(githubClient);

startServer(express, githubService);