const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
  cb (null, true)
  } else {
    cb(null, false)
  }
}

const FileUpload = () => {
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./images");
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });

  var upload = multer({ storage: storage});
  return upload;
};

module.exports = { FileUpload };
