const router = require("express").Router();
const { upload } = require("../utils");

const {
  addProduct,
  getProducts,
  getProduct,
  getProductsOfOwner,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router
  .route("/")
  .get(getProducts)
  .post(
    upload.single("product_photo"),
    (err, req, res, next) => {
      if (err) return res.status(400).json({ message: err.message });
      next();
    },
    addProduct
  );
router
  .route("/:id")
  .get(getProduct) //THIS ONE DOES NOT BENIFIT FROM THE OWNER MAN AS OF NOW
  .patch(updateProduct);
router.route("/:owner/:id").delete(deleteProduct);
router.route("/user/requesting-product-by/:owner_id").get(getProductsOfOwner);

module.exports = router;
