const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
// const { formidable } = require("formidable");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "peblm with image . is big",
      });
    }

    // destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "pls include all fields",
      });
    }

    let product = new Product(fields);

    //handle file here

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file sxize is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // console.log(product);

    //save to db

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "saving prod in db failed",
        });
      }
      res.json(product);
    });
  });
};
//somewhat optimization
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//delete controll
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.json({
        error: "failed to delete the product",
      });
    }
    res.json({
      message: "successfully product removed",
      deletedProduct,
    });
  });
};

//update prod
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "peblm with image . is big",
      });
    }

    //update of code lodash se
    let product = req.product;
    product = _.extend(product, fields);

    //handle file here

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file sxize is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // console.log(product);

    //save to db

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "updation failed",
        });
      }
      res.json(product);
    });
  });
};

//product listing

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  // let sortBy = req.query.sortBy ? req.query.sortBy : "_id"; //getting error fromt this vari 

  Product.find()
    .select("-photo")
    .populate("category")
    .sort({ _id: -1})
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "bulk operation failed",
      });
    }
    next();
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "no category found",
      });
    }
    res.json(category);
  });
};
