//server.js

//var http = require('http')
var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
const swaggerUi = require('swagger-ui-express');

var dbConfig=require('./config/database.config');
const swaggerDocument = require('./swagger.json');
const logger = require('./config/logger.config');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Log a message
logger.info('Welcome to application');

mongoose.connect(dbConfig.url,{}).then(()=>{
    logger.info("Connected to database.");
}).catch();

var userRoutes = require('./routes/userRoutes');
app.use('/',router);
router.use('/',userRoutes);


module.exports=app.listen(3000,function(req,res){
    logger.info("Server is running at 3000 port..")
})

// var server=http.createServer(function(req,res){
//     res.writeHead(200,{"content-type":"text/plain"});
//     // res.end("Hello world");
// });

// server.listen(3000,function(){
//     console.log("Server is running at 3000 port.")
// })