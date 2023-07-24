const jwt = require("jsonwebtoken");

exports.userAccesToken = function (username) {
  //Access token
  const { _SIGN } = process.env;
  try {
   let accessToken = jwt.sign({ username: username }, _SIGN,  { expiresIn: "10m"});
   return accessToken
  } catch (err) {
    console.log(err)
    return err
  }
};

exports.userRefreshToken = function (username) {
  //refresh access token
  const { _SIGNREFRESH} = process.env;
  try {
    let refreshToken = jwt.sign({ username: username }, _SIGNREFRESH, {
      expiresIn: "1d",
    });
    return refreshToken
  } catch (err) {
    return err
  }
};

exports.refreshToken = async function (req, res) {
  if (req.cookies?.user_access) {
    const { _SIGN, _SIGNREFRESH } = process.env;
    // Destructuring refreshToken from cookie
    let refreshToken = await req.cookies.user_access
    jwt.verify(refreshToken, _SIGNREFRESH, 
    (err, decoded) => {
        if (err) {
            // Wrong Refesh Token
            console.log("error en verificacion")
            return res.status(406).json({ message: 'Unauthorized.' });
        }
        else {
            // Correct token we send a new access token

            const accessToken = jwt.sign({username: decoded.username}, _SIGN, {expiresIn: '10m'});
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
    return res.status(401).send({
      msg: "Not authorizated",
    });
  }
  next();
};

exports.validSign = function (req, res, next) {
  const { _SIGN } = process.env;
  const token = req.headers["auth"];
  try {
    jwt.verify(token, _SIGN);
    next();
  } catch (error) {
    console.log(error)
    console.log("token not authorized");
    return res.status(401).send({
      msg: "You have no authorization",
    });
  }
};
