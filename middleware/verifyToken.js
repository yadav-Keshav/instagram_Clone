const { createError } =require('../utility/createError');
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.SECRET, (err, id) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.id = user;
      next();
    });
  };