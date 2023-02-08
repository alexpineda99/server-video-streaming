const bcrypt = require('bcrypt');

module.exports.hashPassword = async (req, res) =>{
    
    let passhash = await bcrypt.hash("ronaldo", 10)
    let unhash = await bcrypt.compare("ronaldo", passhash)
    res.send({
        hash: passhash,
        unhashed: unhash
    })
      
    }
