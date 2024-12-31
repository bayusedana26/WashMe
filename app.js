const express = require('express');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ... other middleware and routes ...

// Error handling middleware (should be last)
app.use(errorHandler); 