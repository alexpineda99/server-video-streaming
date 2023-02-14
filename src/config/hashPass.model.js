const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.hashPassword = async (req, res) =>{
    
    let {_SIGN} = process.env;

    // let passhash = await bcrypt.hash("ronaldo", 10)
    // let unhash = await bcrypt.compare("ronaldo", passhash)
    // res.send({
    //     hash: passhash,
    //     unhashed: unhash
    // })



    //JWT
    let encode = await jwt.sign({username: "alex", id: 1}, _SIGN, {algorithm: "HS256", expiresIn: "10m"})
    let decode = await jwt.verify(encode, _SIGN);

    res.send({
        encode: encode,
        decode: decode
    })

    }
