const path = require("path");
const multer = require("multer");
const fsPromises = require("fs").promises;

const deleteFile = async (imageLink) => {
  try {
    const paths = imageLink.split("/").splice(-2, 2);
    if (paths[1] !== "avatar-default.png") {
      //do not remove the default avatar from the uploads
      await fsPromises.unlink(path.join("src", paths[0], paths[1]));
    }
  } catch (err) {
    console.log("ERROR DELETING THIS FILE WHY", err);
  }
};

//multerfication charot
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, "src/uploads/");
    } else {
      cb(new Error("Invalid file format"), null);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now() + Math.round(Math.random() * 1000)}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({ storage: storage });

module.exports = {
  deleteFile,
  upload,
};
