'use strict'

const express = require('express')
const BookRouter = express.Router()

const bookController = require('../controller/bookController')

BookRouter.route('/api/book')
  .get((req, res) => bookController.getBook(req, res))
  .post((req, res) => bookController.createBook(req, res))
  .put((req, res) => bookController.updateBook(req, res))
  .delete((req, res) => bookController.deleteBook(req, res))


BookRouter.route('/api/book/search')
  .get((req, res) => bookController.searchBooksByName(req, res))

module.exports = BookRouter
