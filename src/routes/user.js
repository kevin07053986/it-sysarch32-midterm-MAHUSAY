const router = require("express").Router();
const {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} = require("../controllers/user");
const { upload } = require("../utils");

//DONT FORGET THE PROFILE NAME LATER
router
  .route("/:id")
  .delete(deleteUser)
  .patch(
    upload.single("profile"),
    (err, req, res, next) => {
      if (err) return res.status(400).json({ message: err.message });
      next();
    },
    updateUser
  );
router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
//router.route("/signin").post()

module.exports = router;
