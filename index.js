const express = require('express')
const app = express();
require('dotenv').config();
require('./config/DatabaseConnect');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path')
// Port
const port = process.env.PORT || 3000;

// middlewares
const middlewares = [
    cors(),
    express.json(),
    morgan('dev'),
    helmet(),
    
]
app.use(middlewares);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// routes
const setRoute = require('./routes/routes');
setRoute(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
    next();
});
app.listen(port, () => console.log(`Server is running on port ${port}!`));