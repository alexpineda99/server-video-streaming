const jwt = require("jsonwebtoken");

exports.authHeader = function(req, res, next) {


    const token = req.headers['auth'];
    
    if (token === null || token === undefined) {
        console.log("Token not defined");
        return res.status(401).send({
            msg: "Not authorizated",
        });
        
    }
    next();
}

exports.validSign = function (req, res, next) {

    const {_SIGN} = process.env;
    const token = req.headers['auth'];

    try {
        jwt.verify(token, _SIGN);
        next();
    }
    catch(error) {
        console.log("token no autorizado")
        return res.status(401).send({
            msg: "You have no authorization"
        })
    }

}