const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true
    },
    product: {
      type: ObjectId,
      ref: 'Product'
    },
    quantity: [
      {
        quantityName: String,
        pricePerUnit: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
