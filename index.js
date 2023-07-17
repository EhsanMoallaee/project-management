const Application = require('./app/server');
require('dotenv').config();

const DB_ULR = 'mongodb://127.0.0.1:27017/botostart-project-management';
new Application(3000, DB_ULR)