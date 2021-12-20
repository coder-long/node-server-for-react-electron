var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const mongodb = require('./mongo')

mongodb.connect()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fileRouter = require('./routes/file')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
// 校验token，获取headers⾥里里的Authorization的token，要写在路由加载之前，静态资源之后

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
    secret: 'hel666',
    algorithms: ['HS256'],
    credentialsRequired: false,//是否允许无token请求
}).unless({
    path: ['/', '/user/login']//除了这个地址，其他的URL都需要验证
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/file', fileRouter);

// 解析token获取用户信息
// app.use(function (req, res, next) {
//     let token = req.headers['authorization'];
//     if (!token) {
//         return next();
//     } else {
//         mongodb.validateToken(token).then((data) => {
//             req.data = data;
//             return next();
//         }).catch((error) => {
//             console.log(error);
//             return next();
//         })
//     }
// });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    } else {
        res.status(err.status || 500).send(err.toString());
    }
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
