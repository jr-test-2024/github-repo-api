const express = require('express');
const startServer = require('./src/server');

const githubClient = require('./src/githubClient')();
const githubService = require('./src/github')(githubClient);

startServer(express, githubService);