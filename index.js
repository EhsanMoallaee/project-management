const Application = require('./app/server');

const DB_ULR = 'mongodb://localhost:27017/botostart-project-management';
new Application(3000, DB_ULR)