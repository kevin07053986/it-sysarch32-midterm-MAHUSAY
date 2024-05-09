const mongoose = require("mongoose");
const Order = require("../schemas/order");

//FOR ADMINS
const getOrdersFOR_ADMIN = async (req, res) => {
  try {
    const orders = await Order.find().exec();
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    return res.sendStatus(500);
  }
};

const getOrders = async (req, res) => {
  const { user_id } = req.params;
  try {
    const orders = await Order.find({ user_id }).exec();
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError)
      return res.status(400).json({ message: "Invalid product id" });
    return res.sendStatus(500);
  }
};

const addOrder = async (req, res) => {
  const Product = require("../schemas/product");
  const { quantity, product_id } = req.body;
  try {
    await Product.findById(product_id);
    const createdOrder = await Order.create({ quantity, product: product_id });
    return res.status(201).json({ success: true, order: createdOrder });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError)
      return res
        .status(400)
        .json({ message: "No product found under this id" });
    return res.sendStatus(500);
  }
};

const deleteOrder = async (req, res) => {
  const { order_id } = req.params;
  try {
    await Order.findByIdAndDelete(order_id);
    return res.status(200).json({ success: true });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError)
      return res.status(400).json({ message: "Invalid order id" });
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = {
  getOrdersFOR_ADMIN,
  getOrders,
  addOrder,
  deleteOrder,
};

// const updateOrder = async (req, res) => {
//     const { order_id } = req.params
//     const updatedProductInfo = req.body
//     try{
//         const updatedOrder = Order.findOneAndUpdate({_id: order_id }, {$set: updatedProductInfo}, {new: true} )
//         return res.status(200).json({ success: true, product: updatedOrder })

//     }catch(err){
//         if(err instanceof mongoose.Error.CastError || err instanceof TypeError) return res.status(400).json({message: "Invalid product id"})
//         console.log('ERROR AT UPDATE ORDER',err)
//         return res.sendStatus(500)
//     }
// }
