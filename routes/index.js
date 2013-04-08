
/*
 * GET home page.
 */

exports.ROOT_PATH = '/';
exports.index = function(req, res){

    res.render('index', { title: 'Express', message: req.flash('error') });

};

exports.WELCOME_PATH = '/welcome';
exports.welcome = function(req, res) {

    console.log('welcoming');
    res.render('welcome', {username: req.user.username});

};


