const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: String,
    genre: String,
    pdf_url: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
            },
            message: props => `${props.value} não é uma URL válida.`
        }
    },
    read_progress: {
        type: Number,
        default: 0
    }
}, { timestamps: true }); // Adiciona createdAt e updatedAt

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;



// Aprendendo:
// mongoose.Schema: Define a estrutura dos dados que serão armazenados no MongoDB;
// model: Cria um modelo baseado no esquema, o que facilita a interação com o banco de dados.