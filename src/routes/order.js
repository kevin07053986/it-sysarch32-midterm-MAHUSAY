const router = require("express").Router();
const {
  addOrder,
  getOrdersFOR_ADMIN,
  getOrders,
  deleteOrder,
} = require("../controllers/order");

router.route("/").post(addOrder).get(getOrdersFOR_ADMIN);
router.route("/:user_id").get(getOrders);
//get orders based on the product id returns list of orders under that product  DO THIS LATER MAK
router.route("/:order_id").delete(deleteOrder);

module.exports = router;
