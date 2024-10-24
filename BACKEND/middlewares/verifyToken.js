const jwt = require("jsonwebtoken");
// Verify Token
function VerifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedPayload;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "invalide Token , access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "no token provided , access denied" });
  }
}

//Verify Token & Admin
function verifyTokenAndAdmin(req, res, next) {
  VerifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "not allowed, only admin" });
    }
  });
}

//Verify Token & Only User Himself
function verifyTokenAndOnlyUser(req, res, next) {
  VerifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "not allowed, only User Himself" });
    }
  });
}

module.exports = { VerifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser };
