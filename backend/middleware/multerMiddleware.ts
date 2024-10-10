import multer from "multer";

const storage = multer.diskStorage({
  filename: function (_, file, cb ) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage});

// const upload = multer({storage, limits: { fileSize: 20 * 1024 * 1024 } });

export default upload;