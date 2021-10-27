const passport = require('passport');
const bCrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.model');

passport.use(
  'login',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({ username: username }, function (err, user) {
        // In case of any error, return using the done method
        if (err) return done(err);
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log('User Not Found with username ' + username);
          return done(
            null,
            false,
            //req.flash('message', 'User Not found.'));
            console.log('message', 'User Not found.'),
          );
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(
            null,
            false,
            //req.flash('message', 'Invalid Password'));
            console.log('message', 'Invalid Password'),
          );
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      });
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: ID,
      clientSecret: SECRET,
      callbackURL: 'http://127.0.0.1:' + 8080 + '/facebook-token',
    },
    function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Facebook profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Facebook account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    },
  ),
);

var isValidPassword = function (user, password) {
  return bCrypt.compareSync(password, user.password);
};

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      findOrCreateUser = function () {
        // find a user in Mongo with provided username
        User.findOne({ username: username }, function (err, user) {
          // In case of any error return
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }
          // already exists
          if (user) {
            console.log('User already exists');
            return done(
              null,
              false,
              //req.flash('message','User Already Exists'));
              console.log('message', 'User Already Exists'),
            );
          } else {
            // if there is no user with that email
            // create the user
            var newUser = new User();
            // set the user's local credentials
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.body.email;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;

            // save the user
            newUser.save(function (err) {
              if (err) {
                console.log('Error in Saving user: ' + err);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser);
            });
          }
        });
      };
      // Delay the execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    },
  ),
);
// Generates hash using bCrypt
var createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(
  'login',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({ username: username }, function (err, user) {
        // In case of any error, return using the done method
        if (err) return done(err);
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log('User Not Found with username ' + username);
          return done(
            null,
            false,
            //req.flash('message', 'User Not found.'));
            console.log('message', 'User Not found.'),
          );
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(
            null,
            false,
            //req.flash('message', 'Invalid Password'));
            console.log('message', 'Invalid Password'),
          );
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      });
    },
  ),
);

var isValidPassword = function (user, password) {
  return bCrypt.compareSync(password, user.password);
};

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      findOrCreateUser = function () {
        // find a user in Mongo with provided username
        User.findOne({ username: username }, function (err, user) {
          // In case of any error return
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }
          // already exists
          if (user) {
            console.log('User already exists');
            return done(
              null,
              false,
              //req.flash('message','User Already Exists'));
              console.log('message', 'User Already Exists'),
            );
          } else {
            // if there is no user with that email
            // create the user
            var newUser = new User();
            // set the user's local credentials
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.body.email;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;

            // save the user
            newUser.save(function (err) {
              if (err) {
                console.log('Error in Saving user: ' + err);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser);
            });
          }
        });
      };
      // Delay the execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    },
  ),
);
// Generates hash using bCrypt
var createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
