const jwt = require("jsonwebtoken");

exports.userAccesToken = function (username) {
  //Access token
  try {
   let accessToken = jwt.sign({ username: username }, process.env._SIGN, { expiresIn: "10m" });
   return accessToken
  } catch (err) {
    return res.status(401).send({
      msg: "Not authorizated",
    });
  }
};

exports.userRefreshToken = function (username) {
  //refresh access token
  try {
    let refreshToken = jwt.sign({ username: username }, process.env._SIGNREFRESH, {
      expiresIn: "1d",
    });
    return refreshToken
  } catch (err) {
    return res.status(401).send({
      msg: "Not authorizated",
    });
  }
};

exports.refreshToken = function (req, res, next) {

  if (req.cookies?.user_access) {
  
    // Destructuring refreshToken from cookie
    let refreshToken = req.cookies.user_access

    jwt.verify(refreshToken, process.env._SIGNREFRESH, 
    (err, decoded) => {
        if (err) {

            // Wrong Refesh Token
            return res.status(406).json({ message: 'Unauthorized.' });
        }
        else {
            // Correct token we send a new access token
            const accessToken = jwt.sign({
                token: "user_access"
            }, process.env._SIGN, {
                expiresIn: '10m'
            });
            return res.json({ accessToken });
        }
    })
} else {
    return res.status(406).json({ message: 'Unauthorized..' });
}

}

exports.authHeader = function (req, res, next) {
  const token = req.headers["auth"];

  if (token === null || token === undefined) {
    console.log("Token not defined");
    return res.status(401).send({
      msg: "Not authorizated",
    });
  }
  next();
};

exports.validSign = function (req, res, next) {
  const { _SIGN } = process.env;
  const token = req.headers["auth"];
  // req.cookies.name='Gourav'; 
  console.log("hola")
  console.log(req.cookies)

  try {
    jwt.verify(token, _SIGN);
    next();
  } catch (error) {
    console.log("token no autorizado");
    return res.status(401).send({
      msg: "You have no authorization",
    });
  }
};
