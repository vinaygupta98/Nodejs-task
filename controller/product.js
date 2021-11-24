const Product = require("../models/product");
exports.addProduct = async (
  req,
  res
) => {
  try {
    const newProduct =
      new Product(req.body);
    const savedProduct =
      await newProduct.save();
    if (!savedProduct)
      return res.send({
        error:
          "Unable to add new product ",
      });
    return res
      .status(201)
      .send(savedProduct);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({
        error: error.message,
      });
  }
};
exports.getProducts = async (
  req,
  res
) => {
  try {
    const allProduct =
      await Product.find({});
    if (
      allProduct.length === 0
    )
      return res.send({
        error:
          "No product Found add Some to see Product",
      });
    return res
      .status(200)
      .send(allProduct);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({
        error: error.message,
      });
  }
};
exports.getProductById =
  async (req, res) => {
    try {
      const id = req.query.id;
      const product =
        await Product.findById(
          id
        );

      if (!product)
        return res.send({
          error:
            "Can't get Product for this Id",
        });
      return res
        .status(200)
        .send(product);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({
          error:
            error.message,
        });
    }
  };
exports.searchProducts =
  async (req, res) => {
    try {
      const searchvalue =
        req.query.search;
      let santSearchValue =
        await searchvalue
          .replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
          )
          .replace(
            /\s+/g,
            " "
          )
          .trim();
      const searchedProduct =
        await Product.find({
          $or: [
            {
              name: {
                $regex:
                  new RegExp(
                    santSearchValue,
                    "gi"
                  ),
              },
            },
            {
              description: {
                $regex:
                  new RegExp(
                    santSearchValue,
                    "gi"
                  ),
              },
            },
          ],
        });

      if (
        searchedProduct.length ===
        0
      )
        return res.send({
          error:
            "Can't get Product for this search query",
        });
      return res
        .status(200)
        .send(
          searchedProduct
        );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(error);
    }
  };
exports.updateProduct =
  async (req, res) => {
    try {
      const update = req.body;
      if (update._id) {
        const updatedProduct =
          await Product.findByIdAndUpdate(
            {
              _id: update._id,
            },
            { $set: update },
            { new: true }
          );
        return res.send(
          updatedProduct
        );
      } else {
        return res
          .status(500)
          .send({
            error:
              "Not Object Id received",
          });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(error);
    }
  };
