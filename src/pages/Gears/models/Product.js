// File: Product.js
// this file contains the product model schema for a MongoDB database using Mongoose. It defines the structure of the product documents, including fields like name, description, type, category, price, stock, image, and createdAt. The schema also includes validation rules for required fields and data types.
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['comboSet', 'seasonalSet', 'category'],
    required: true
  },
  category: {
    type: String,
    enum: ['clothing', 'items', 'localProduct'],
    required: function() {
      return this.type === 'category';
    }
  },
   discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema);