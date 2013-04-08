
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/welcome', routes.welcome);

var users = {
    'rottenjohny': 'password'
};

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('Authenticating');
        var pwd = users[username];
        if(!pwd) {
            return done(null, false, { message: 'Incorrect username' });
        }
        if(password !== pwd) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, { username: username });
    }
));

passport.serializeUser(function(user, done) {
    console.log('serializing user');
    done(null, user.username);
});

passport.deserializeUser(function(user, done) {
    console.log('deserializing user');
    done(null, { username: user });
});

app.post('/login', passport.authenticate('local', { successRedirect: '/welcome',
                                                    failureRedirect: '/',
                                                    failureFlash: true })
);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
