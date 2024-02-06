const express = require('express');
const startServer = require('./src/server');
const githubService = require('./src/github')();

startServer(express, githubService);