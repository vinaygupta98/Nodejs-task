const mongoose = require("mongoose");
const Schema =
  mongoose.Schema;

const productSchmea =
  new Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

// Export the modelname
module.exports =
  mongoose.model(
    "Product",
    productSchmea
  );
