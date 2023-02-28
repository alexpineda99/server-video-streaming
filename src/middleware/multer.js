const multer = require("multer");

    const storage = multer.memoryStorage();
  
    const AvatarUpload = multer({storage}).single("file");

    export default AvatarUpload;
  