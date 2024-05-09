const mongoose = require("mongoose");
const Product = require("../schemas/product");
const User = require("../schemas/user");
const { deleteFile } = require("../utils");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "productOwner",
      select: "image email name",
    });
    if (!product)
      return res.status(400).json({
        success: false,
        message: `Could not find product with this id ${req.params.id}`,
      }); //Feel nako useless ni kai mo throw error maning mongoose if wala silay makita na id

    return res.status(200).json({ success: true, product });
  } catch (err) {
    console.log(err);
    if (err instanceof mongoose.Error.CastError)
      return res.status(400).json({ message: "Invalid product id" });
    return res.sendStatus(500);
  }
};

const getProductsOfOwner = async (req, res) => {
  try {
    const { owner_id } = req.params;
    const products = await Product.find({ productOwner: owner_id });
    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.log("ERROR IN GETTING  SELLER'S PRODUCTS");
    return res.status(500).json({ error: err });
  }
};

const addProduct = async (req, res) => {
  const { name, price, productOwnerId } = req.body;
  console.log(req.body);
  try {
    const createdProduct = await Product.create({
      name,
      price,
      productOwner: productOwnerId,
      productImage: `http://localhost:3000/uploads/${req.file.filename}`,
    });
    if (!createdProduct) return res.sendStatus(400);

    //update the User collection too
    await User.findByIdAndUpdate(productOwnerId, {
      $push: { products: createdProduct._id },
    });
    return res.status(201).json({ success: true, product: createdProduct });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedInfo = req.body;
  console.log(updatedInfo);
  if (Object.keys(updatedInfo).length == 0) return res.sendStatus(400);

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $set: updatedInfo },
      { new: true }
    );
    return res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    console.log(err);
    if (err instanceof mongoose.Error.CastError) return res.sendStatus(400);
    return res.sendStatus(500);
  }
};

const deleteProduct = async (req, res) => {
  const { id, owner } = req.params;
  const { imageLink } = req.query;
  try {
    await Product.deleteOne({ _id: id });
    await User.findByIdAndUpdate(owner, { $pull: { products: id } }); //this filters all the product_ids that match with the id in the products array
    await deleteFile(imageLink);
    //also delete the files under ana na product
    return res.status(204).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductsOfOwner,
  addProduct,
  updateProduct,
  deleteProduct,
};
