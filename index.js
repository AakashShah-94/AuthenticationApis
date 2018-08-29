const express           = require('express');
const bodyParser        = require('body-parser');
const cors              = require('./helpers/cors.js');
const db                = require('./helpers/dbConn.js');
const config            = require('./config.json');
global.logger           = console;

 const startServer = () => {
    
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(cors);
     require('./routes/routes')(app);

     app.listen(config.PORT, config.HOST, () => {
       logger.log('Server listening @PORT: ' + config.PORT);
     });
 }

db.connect().then((result) => {
    logger.log(result);
    startServer();
}).catch(err => {
    logger.log(err);
});