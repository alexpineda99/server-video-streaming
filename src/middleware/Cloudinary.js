const DatauriParser = require("datauri/parser");
const multer = require("multer");
const cloud = require("../config/cloudinary_conf");
const upload = multer();
const path = require("path");

module.exports.getDataUri = async function (req, res) {


    const {avatar} = req.body;

    // console.log(avatar)

    // res.send({
    //     msg: avatar
    // })


    console.log(req)


    // aqui termina la prueba

    // const parser = new DatauriParser();

    // const rutaimg = path.join(__dirname, "..", "assets_test", "Screenshot 2023-02-21 150433.png");
    
    // const extName = path.extname(rutaimg);
    // let result = parser.format(extName, rutaimg)
    // console.log(typeof(result.content))

    // try {
    //     await cloud.uploader.upload(result.content);
    // }catch(err) {
    //     console.log(err)
    // }


};
