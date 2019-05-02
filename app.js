const express   = require('express');
const path      = require('path');
const compression = require('compression');
const logger    = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const serveIndex = require('serve-index');
const fileUpload = require('express-fileupload');

//Rutas del API
const apiRoutes     = require('./routes/api');
const catalogRoutes = require('./routes/catalogosRoutes');
const reportsRoutes = require('./routes/reports');
const authRoutes    = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const contabilidadRoutes = require('./routes/contabilidadRoutes');

const app = express();

// Comprime todas las respuestas
app.use(compression())

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/reports', reportsRoutes);

//Imagenes
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));


//Configuracion cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use('/', apiRoutes);
app.use('/', catalogRoutes);
app.use('/', authRoutes);
app.use('/', restaurantRoutes);
app.use('/', contabilidadRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.log('Middleware errores', err);
    
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;