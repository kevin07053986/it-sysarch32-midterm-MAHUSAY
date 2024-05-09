const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const database = require("./database");
const User = require("./schemas/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth",  require("./routes/user"));

app.use("/api", (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET_KEY
    );
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Token has expired" });
  }
});

app.post("/api/validate-user", async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById(_id);
    if (!user)
      return res.status(401).json({ message: "Special Unauthorized Access" });
    res.status(200).json({ success: true, user }); 
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

app.use("/api/products", require("./routes/product"));
app.use("/api/orders", require("./routes/order"));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

database().then(() => {
  app.listen(3000, () => {
    console.log("Server is running...");
  });
});
