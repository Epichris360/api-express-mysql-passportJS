const express    = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const passport   = require('passport');
const pe         = require('parse-error');
const cors       = require('cors');

const v1  = require('./routes/v1');
const app = express();

const CONFIG = require('./config/config');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport
app.use(passport.initialize());

//================================
// DB and loading models==========
//================================
const models = require('./models');
models.sequalize.authenticate().then(() => {
  console.log('Connected to SQL database: ' + CONFIG.db_name);
}).catch(err => {
  console.error('Unable to connect to SQL database: ' + CONFIG.db_name);
});
if(CONFIG.app == 'dev'){
  models.sequalize.sync();
  // models.sequalize.sync({force: true});
}

// Cors so that other websites can make requests\
app.use(cors());

//=========================================
// Setup routes and handle errors==========
//=========================================
app.use('/v1',v1);

app.use('/', (req, res) => {
  res.statusCode = 200;// send the appropriate status code
  res.json({status:"success", message: "Parcel pending API", data: {}});
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('not found');
  err.status = 404;
  next(err)
});

// error handler
app.use((err, req, res, next) => {
  //  set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error')
});

module.exports = app;

process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});
