const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

module.exports = uploads = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    let types = /jpeg|jpg|png|gif/;
    let extName = types.test(path.extname(file.originalname).toLowerCase());
    let mineType = types.test(file.mimetype);

    if (extName && mineType) {
      cb(null, true);
    } else {
      cb(new Error("File type doesn't support"));
    }
  },
});

