const jwt = require("jsonwebtoken");
const status = require("../global/statuscode");
const { errors } = require("../global/messages");

module.exports = function checkTokenJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token)
    return res
      .status(status.UNAUTHORIZED)
      .send({ auth: false, message: errors.noToken });

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) {
      return res
        .status(status.BAD_REQUEST)
        .send({ auth: false, message: errors.invalidToken });
    }
    req.loggedUser = decoded.sub;
    next();
  });
};
