const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product'
        },
        package: {
          type: ObjectId,
          ref: 'Package'
        },
        amount: [
          {
            quantityName: String,
            quantity: Number,
            pricePerUnit: Number
          }
        ],
        totalPrice: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
