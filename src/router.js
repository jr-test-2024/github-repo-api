const createRouter = function (expressRouter) {
  expressRouter.get('/repos', (req, res) => {
    // Handle GET request for /api/users
    res.json({ message: 'Get all users' });
  });

  expressRouter.post('/users', (req, res) => {
    // Handle POST request for /api/users
    res.json({ message: 'Create a new user' });
  });

  return expressRouter;
}

// Export the router
module.exports = createRouter;