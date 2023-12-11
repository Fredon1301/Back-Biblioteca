const book = require('../models/Book');
const jwtService = require('jsonwebtoken');
const user = require('../models/User')

module.exports = {
    getBook: (req, res) => {
        book.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result);
        }).catch(() => {
            res.status(500).json({ message: "Não foi possível recuperar os Livros" });
        });
    },
    deleteBook: async (req, res) => {
        if (req.user.permission === 10) {
        try {
            const result = await book.deleteOne({ codBook: req.body.codBook });
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Livro removido com sucesso" });
            } else {
                res.status(404).json({ message: "Livro não encontrado para remoção" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível remover o Livro" });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
    },
    getBooks: async (req, res) => {
        try {
             const result = await book.findOne({ codBook: req.body.codBook });
             if (!result) {
                 res.status(404).json({ message: "Livro não encontrado" });
             } else {
                 res.status(200).json(result);
             }
         } catch (err) {
             res.status(500).json({ message: "Não foi possível recuperar o Livro no momento" });
        }
  },
  updateBook: async (req, res) => {
    if (req.user.permission === 10) { 
        try {
            const result = await book.updateOne({ codBook: req.body.codBook }, req.body);
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: "Livro atualizado com sucesso" });
            } else {
                res.status(404).json({ message: "Livro não encontrado para atualização" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados" });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
},
    createBook: async (req, res) => {
        if (req.user.permission === 10) {
            try {  
                const result = await book.create(req.body);
                res.status(201).json({ message: `O Livro ${result._doc.name} foi criado com sucesso` });
        } catch (err) {
            res.status(500).json({ message: `Não foi possível criar o Livro ${req.body.name}` });
        }
    } else {
        res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
    }
    },
    searchBooksByName: async (req, res) => {
        const { name } = req.query;
        try {
            const books = await book.find({ name: { $regex: new RegExp(name, 'i') } }).select(['-__v', '-_id']);
      
            res.status(200).json(books);
          } catch (err) {
            res.status(500).json({ message: 'Erro ao pesquisar livros', error: err.message });
          }
        },
};

