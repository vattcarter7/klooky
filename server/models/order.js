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
        quantity: [
          {
            quantityName: String,
            pricePerUnit: Number
          }
        ],
        total: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
