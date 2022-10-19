var express = require('express');
var app = express();    
var path =  require('path');
var expresshbs = require('express-handlebars');
var bodyparser = require('body-parser');
const mysql = require("mysql");
const dotenv = require('dotenv');
var async = require('async');


const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
var expressValidator = require('express-validator');

const mysqlapp = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');




// surpass limits 




/* Initializations */
require('./lib/passport');



dotenv.config({path:'./.env'});


var PORT = process.env.PORT || 4500;


// app.engine('hbs', expresshbs.engine({defaultlayout:'base',extname:'hbs'}));
app.engine('hbs', expresshbs.engine({defaultlayout:'base',extname:'.hbs',

layoutsDir: path.join(app.get('views'), 'layouts'),
partialsDir: path.join(app.get('views'), 'partials'),
helpers: require('./lib/handlebars')}));
//viewss
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath)); 



//middlewares 
// app.use(bodyparser.json({limit: '50mb'}));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* Middlewars */
app.use(session({
    secret: 'crud_links_session',
    resave: false,
    saveUninitialized: false,
    store: new mysqlapp(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

/* Global Variables */
app.use((req, res, next) => {
    
let connection = require('./database/conn');
let queries = require('./database/queries/notif');
const { isLoggedIn } = require('./lib/auth');

    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    if (req.user == undefined){
        console.log("hi")   
}else{ 
    connection.query(queries.count_Notcompleted(req.user.username),(err, result)=>{
   
        // app.locals.user = req.user 
        // console.log(req.user)
    
          app.locals.copyright = result;
    
        //   console.log(result)
    
    })
    connection.query(queries.alert(req.user.username),(err, result)=>{
  
          app.locals.alert = result;
                    // console.log(req.user.username)

    })
    connection.query(queries.alerts,(err, result)=>{

          app.locals.alerts = result;
        //   console.log(result)

    
    })
   }
 
    next();
});

/* Routes */
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));



//routes 
// app.get('/',(req,res)=>{

//     res.render('auth/signin.hbs');
// })


// var indexrouter = require('./routes/index');
// var questionrouter = require('./routes/question');
// admin routes 
var indexrouter = require('./routes/index');
var questionrouter = require('./routes/question');
var settings = require('./routes/settings');
var assessrouter = require('./routes/task_management');
var notif = require('./routes/notification');
// var questionsrouter = require('./routes/questions');


// var question2router = require('./routes/question');

var regrouter = require('./routes/register');
var logrouter = require('./routes/login');

// routes location assessrouter
app.use('/index', indexrouter);
app.use('/question', questionrouter);
app.use('/question2', questionrouter);
app.use('/users', questionrouter);
app.use('/assessments', assessrouter);
app.use('/', notif);


app.use('/question/edit', questionrouter);
app.use('/question/edit2', questionrouter);
app.use('/question/edit3', questionrouter);
app.use('/assessments/edit3', assessrouter);
// app.use('/questions/edits', questionsrouter);




// app.use('/', pagesrouter);


app.use('/',require('./routes/pages'));
app.use('/',require('./routes/page2'));
app.use('/',require('./routes/page3'));
app.use('/',require('./routes/page31'));

app.use('/',require('./routes/page4'));
app.use('/',require('./routes/page5'));
app.use('/',require('./routes/admin'));
app.use('/',require('./routes/alert'));
app.use('/',require('./routes/questions'));


app.use('/assess',require('./routes/assess'));
app.use('/assess_user',require('./routes/assess_user'));


app.use('/auth',require('./routes/auth'));
app.use('/auth2',require('./routes/auth2'));
app.use('/auth3',require('./routes/auth3'));
app.use('/alert',require('./routes/alert'));



app.use('/', settings);


// admin routes locations

// app.use('/index', indexrouter);
// app.use('/question', questionrouter);
app.use('/register', regrouter);
app.use('/login', logrouter);

// app.locals.copyright = '2014';


app.use((req, res, next) => {
 console.log(req.user)

    next();
});

app.listen(PORT, ()=>{

    console.log('server runinng 4500');
})