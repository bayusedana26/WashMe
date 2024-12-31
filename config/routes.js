const allRoute = require('../routes/allRoute');

const configureRoutes = (app) => {
  // API routes
  app.use('/api/v1', allRoute);

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Resource not found'
    });
  });
};

module.exports = configureRoutes; 