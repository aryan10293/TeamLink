module.exports = {
    ensureAuth: function (req, res, next) {
      console.log(req.isAuthenticated())
      if (req.isAuthenticated()) {
        return next();
      } else {
        console.log(req.isAuthenticated())
        res.redirect("/deletecart");
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/dashboard");
      }
    },
  };