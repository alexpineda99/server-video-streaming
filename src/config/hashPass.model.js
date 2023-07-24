const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.hashPassword = async (req, res, next) => {
  let { _SIGN, _SIGNREFRESH } = process.env;
  //   res.cookie("jt", "token", {
  //   httpOnly: true,
  //   sameSite: "None",
  //   secure: true,
  //   maxAge: 120*1000,
  // });
  // res.status(404).send();
  // if (req.cookies) {
  //   console.log(req.cookies)
  //   res.clearCookie("jt")
  //   res.send({cookies: req.cookies})
  // } else {
  //   console.log("error aca")
  // }

  // await res.cookie("jt", "token", {
  //   httpOnly: true,
  //   sameSite: "None",
  //   secure: true,
  //   maxAge: 24 * 60 * 60 * 1000,
  // });

  // res.clearCookie("jwt")
  // console.log(req.cookies)
  // res.send({msg: "cookie", puede: req.cookies})
  // next()

  // let passhash = await bcrypt.hash("ronaldo", 10)
  // let unhash = await bcrypt.compare("ronaldo", passhash)
  // res.send({
  //     hash: passhash,
  //     unhashed: unhash
  // })

  //JWT
  // try {
  //   let encode = await jwt.sign({ username: "alex", id: 1 }, _SIGN, {
  //     algorithm: "HS256",
  //     expiresIn: "10s",
  //   });
  //   let decode = await jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJpZCI6MSwiaWF0IjoxNjg3NTgwNjM5LCJleHAiOjE2ODc1ODA2NDl9.rYcJ52hND55J974BMeiDsAScYTZdQwrnuxatDEsxO0Q",_SIGN);

  //   console.log("encoded: " + encode);
  //   console.log("decoded: " + decode);

  //   res.send({
  //     encode: encode,
  //     decode: decode,
  //   });
  // } catch (err) {

  //   res.send({
  //       error: err
  //     });
  // }
};
