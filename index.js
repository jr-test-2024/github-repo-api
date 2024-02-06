const express = require('express');
const router = express.Router();

// Define your API routes here
router.get('/users', (req, res) => {
  // Handle GET request for /api/users
  res.json({ message: 'Get all users' });
});

router.post('/users', (req, res) => {
  // Handle POST request for /api/users
  res.json({ message: 'Create a new user' });
});

// Export the router
module.exports = router;
const app = express();
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});