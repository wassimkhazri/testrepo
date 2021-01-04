var { userModel } = require("../../DB/models/userModel");
const localStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");
module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      userModel.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    userModel.findById({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username
      };
      done(err, userInformation);
    });
  });
};