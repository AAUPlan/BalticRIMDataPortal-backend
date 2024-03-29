const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401);
    next();
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    res.status(200);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400);
    next();
  }
};
