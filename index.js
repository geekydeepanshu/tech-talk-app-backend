require('dotenv').config();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./config/swagger.json');
const connectDB = require('./config/db.js');
const express = require('express');
const morgan = require('morgan');
// const winston = require('./utils/logger');
const routes = require('./routes/index');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();
const router = express.Router();
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectDB();

// Middleware to parse JSON
app.use(express.json());

// CORS
app.use(cors({}))

// HTTP request logging
app.use(morgan('combined'));

// Error logging
// app.use((err, req, res, next) => {
//   winston.error(err.message, err);
//   res.status(500).json({ message: 'Server error' });
// });

// Use the central router, and mount it under '/api'
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log("server is running on PORT= ", port);
});

