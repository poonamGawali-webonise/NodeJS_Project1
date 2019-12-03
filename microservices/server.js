//  server.js

//  var http = require('http')
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const faker = require('faker');

var dbConfig = require('./config/database.config');
const swaggerDocument = require('./swagger.json');
const logger = require('./config/logger.config');
var userRoutes = require('./routes/userRoutes');

//  Authentication using jsonwebtoken
const loginHandler = require('./middleware/loginVerify.middleware');
const tokenHandler = require('./middleware/jwtTokenVerify.middleware');
const verifyTokenMiddleware = require('./middleware/jwtTokenVerify.middleware');

const app = express();
const router = express.Router();

// Log a message
logger.info("Welcome to Node application"+faker.internet.userName());

app.use(bodyParser.json());

logger.info('Swagger implemented');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(dbConfig.url, {}).then(() => {
  logger.info('Connected to database.');
}).catch();

// app.post('/login',loginHandler.login);

app.use('/', router);
router.use('/', userRoutes);//  Authentication using jwtwebtoken ,verifyTokenMiddleware.checkToken

module.exports = app.listen(3000, () => {
  logger.info('Server is running at port 3000');
});
