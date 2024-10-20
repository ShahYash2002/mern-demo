const cron = require("node-cron");

const Product = require("./models/Product");

cron.schedule("* * * * *", async () => {
  try {
    const products = await Product.find({});
    products.forEach((product) => {
      console.log(product.url);
    });
  } catch (error) {
    console.log(error);
  }
});
