const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

// require("./fetch-products-job");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allows requests from all origins. Be cautious in production.
  })
);

// MongoDB connection
mongoose.connect(
  "mongodb+srv://root:root@cluster0.hsjlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use product routes
app.use("/api/products", productRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
