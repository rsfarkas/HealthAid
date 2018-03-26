var User       = require('../app/models/user');
var emailer = require('../mailer');




module.exports = function(app, passport) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });


  // EMAIL SECTION ===============================================================
  app.get('/admin', isLoggedIn, function(req, res) {
    User.find({},{"local.email":1}).exec(function(err, users) {
      if (err) throw err;
      res.render('admin.ejs', {
        "users": users
      });
    });
  });

  app.post('/height', function(req, res){
    console.log("about to email " + req.body.id);
    emailer.heightMailer.sendHeight(req.body.id);
    res.send(' done send height email');
  });

  app.post('/weight', function(req, res){
    console.log("about to email " + req.body.id);
    emailer.weightMailer.sendWeight(req.body.id);
    res.send(' done send weight email');
  });

  app.post('/bp', function(req, res){
    console.log("about to email " + req.body.id);
    emailer.bpMailer.sendBp(req.body.id);
    res.send(' done send bp email');
  });

  app.post('/hr', function(req, res){
    console.log("about to email " + req.body.id);
    emailer.hrMailer.sendHr(req.body.id);
    res.send(' done send hr email');
  });

  app.post('/pap', function(req, res){
    console.log("about to email " + req.body.id);
    emailer.papMailer.sendPap(req.body.id);
    res.send(' done send pap email');
  });

  app.post('/skin', function(req, res){
    console.log("about to email " + req.body.id);
    emailer.skinMailer.sendSkin(req.body.id);
    res.send(' done send skin email');
  });



  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user
    });
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // SETUP ==============================
  app.get('/setup', isLoggedIn, function(req, res) {
    res.render('setup.ejs', {
      user : req.user
    });
  });

  // SKIN ==============================
  app.get('/skin', isLoggedIn, function(req, res) {
    res.render('skin.ejs', {
      user : req.user
    });
  });
  app.get('/skin2', isLoggedIn, function(req, res) {
    res.render('skin2.ejs', {
      user : req.user
    });
  });
  app.get('/skin3', isLoggedIn, function(req, res) {
    res.render('skin3.ejs', {
      user : req.user
    });
  });
  app.get('/skin4', isLoggedIn, function(req, res) {
    res.render('skin4.ejs', {
      user : req.user
    });
  });
  app.get('/skin5', isLoggedIn, function(req, res) {
    res.render('skin5.ejs', {
      user : req.user
    });
  });
  app.get('/skin6', isLoggedIn, function(req, res) {
    res.render('skin6.ejs', {
      user : req.user
    });
  });    app.get('/skin7', isLoggedIn, function(req, res) {
    res.render('skin7.ejs', {
      user : req.user
    });
  });

  // =============================================================================
  // PHI =========================================================================
  // =============================================================================

  app.get('/phi', isLoggedIn, function(req, res) {
    res.render('phi.ejs', {
      user : req.user
    });
  });

  app.post('/phi', isLoggedIn, function(req, res) {
    var user = req.user;
    user.phi = req.body;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  app.post('/ajaxphi', isLoggedIn, function(req, res) {
    var user = req.user;
    var phi = req.body;
    var field = Object.keys(phi)[0];
    user.phi[field].content = phi[field];
    user.save(function (err) {
      if (err) console.log(err);
    });
  });

  app.post('/setup', isLoggedIn, function(req, res) {
    var user = req.user;
    var phiActive = req.body;
    Object.keys(user.phi).forEach(function(key){user.phi[key].visible = false;})
    Object.keys(phiActive).forEach(function(key){user.phi[key].visible = true;})
    user.save(function (err) {
      if (err) console.log(err);
      res.redirect('/profile');
    });
  });


  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/setup', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =============================================================================
  // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
  // =============================================================================

  // locally --------------------------------
  app.get('/connect/local', function(req, res) {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  });
  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

//source: https://scotch.io/tutorials/easy-node-authentication-setup-and-local
