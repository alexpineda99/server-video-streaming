const multer = require("multer");

// const storage = multer.memoryStorage();

// const singleUpload = multer({storage}).single("file");

// export default singleUpload;

const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });
  
  const upload = multer({
      storage: storageEngine
  })
  
  
  export default function uploadAvatar (file) {
    upload.single(file)
  } 
  