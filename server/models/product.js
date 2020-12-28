const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
