const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  cpf: { type: String, required: true },
  produtos: [{
    codBook: {
      type: String,
      required: true,
    },
    bookAttributes: {
      name: {
        type: String,
        required: true,
      },
      Autor: {
        type: String,
        required: true,
      },
      currentPrice: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  orderTotal: {
    type: String, 
    required: false
  }
});

module.exports = mongoose.model("Cart", cartSchema);
