var LocalStrategy = require('passport-local').Strategy;

var users = { 'rottenjohny': 'password' };

var localStrategy = new LocalStrategy(

    function(username, password, done) {

        console.log('Authenticating');

        var pwd = users[username],
            invalid = { message: 'Invalid username or password'};

        if(!pwd || pwd !== password) {
            return done(null, false, invalid);
        }

        return done(null, { username: username });

    }

);

var serializer = function(user, done) {

    console.log('serializing user');
    done(null, user.username);

};

var deserializer = function(user, done) {

    console.log('deserializing user');
    done(null, { username: user });

};

var authenticate = function(passport) {

    return passport.authenticate('local',
        {
            successRedirect: '/welcome',
            failureRedirect: '/',
            failureFlash: true
        }
    );

};

exports.configure = function(app, passport) {

    passport.use(localStrategy);
    passport.serializeUser(serializer);
    passport.deserializeUser(deserializer);

    app.post('/login', authenticate(passport));

};