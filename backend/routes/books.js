const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');

// Criar um novo livro
router.post('/', async (req, res) => {
    const { title, author, description, genre, pdf_url } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            description,
            genre,
            pdf_url,
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: "Erro ao criar livro.", error: err });
    }
});

// Obter todos os livros, com filtro opcional por gênero
router.get('/', async (req, res) => {
    const { genre } = req.query;
    try {
        const query = genre ? { genre } : {};
        const books = await Book.find(query);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: "Erro ao obter livros.", error: err });
    }
});

// Atualizar progresso de leitura de um livro
router.patch('/:id/progress', async (req, res) => {
    const { id } = req.params;
    const { read_progress } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { read_progress },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: "Livro não encontrado." });
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: "Erro ao atualizar o progresso.", error: err });
    }
});

module.exports = router;

// Aprendendo:
// POST /add: Esta rota recebe as informações de um livro e as armazena no banco de dados;
// GET /: Esta rota retorna todos os livros armazenados no banco de dados.