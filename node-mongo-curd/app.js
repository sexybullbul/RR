const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
const connectDB = require('./config/db');
const errorHandler = require('./utils/ErrorHandler');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/users', userRoutes);

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
