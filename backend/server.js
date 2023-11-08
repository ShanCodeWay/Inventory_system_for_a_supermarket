// server.js
const express = require('express');
const cors = require('cors');
const { Item } = require('./models/database');
const { itemRoutes } = require('./controller/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Use the routes defined in routes.js
app.use('/api', itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
