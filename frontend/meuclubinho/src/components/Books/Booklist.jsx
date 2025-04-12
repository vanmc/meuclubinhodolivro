import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const Booklist = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http:localhost:500/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Erro ao buscar os livros:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBooks();
    }, []);

    if (loading) {
        return (
            <div>
                <Spinner />;
            </div>
        );
    };
};

