const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/config');
const User = require('../model/user');
exports.verifyToken = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return next(createError(401, "You are not authenticated!"));
  }
  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, SECRET, (err, payload) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    
    const { id } = payload
    User.findById(id).then(userdata => {
      req.user = userdata
      next()
    })

  })
}