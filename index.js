const Application = require('./app/server');
require('dotenv').config();

const DB_ULR = process.env.DB_URI;
const PORT = process.env.PORT || 3000;

new Application(PORT, DB_ULR)