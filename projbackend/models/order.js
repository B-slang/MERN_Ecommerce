const mongoose  = require("mongoose");
const {ObjectId} = mongoose.Schema;
const ProductCart = new mongoose.Schema({
    product:{
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number,


});

const ProductCart = mongoose.model("ProductCart",ProductCart);

const OrderSchema = new mongoose.Schema(
    {
    products: [ProductCart],
    transaction_id: {},
    amount: {type: Number},
    address: String,
    updates: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
},
{timestamps: true}


);

const Order = mongoose.model("Order",OrderSchema);

module.exports = {Order, ProductCart};