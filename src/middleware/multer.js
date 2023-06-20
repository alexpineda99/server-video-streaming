const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: function (req, file, cb) {
//     const ext = file.originalname.split(".").pop();
//     cb(null, `${Date.now()}.${ext}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    // cb(new Error('Invalid file type'), false);
    console.log("Error invalid type")
  }
};

exports.upload = multer({
  storage,
  limits: {
    fileSize:  1024 * 1024 * 2 //1MB
  },
  fileFilter: fileFilter

})