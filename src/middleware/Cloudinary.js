const datauri = require('datauri');
const multer = require("multer");
const upload = multer()
const path = require("path");

module.exports.getDataUri = async function (req, res) {
    // const {file} = req.body;
    // console.log(json({data: req.body.file}))
    // const parser = new DataUriParser();
    // const extName = path.extname(file.originalName).toString();
    // console.log(extName);
    // return parser.format(extName, file.content);
}

