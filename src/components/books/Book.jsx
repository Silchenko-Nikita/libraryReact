import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './book.module.css';

const Book = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/library/book/${id}`);
                const data = await response.json();
                setBook(data.book);
            } catch (err) {
                setError('Error fetching book data');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/library/books/${id}/authors`);
                const data = await response.json();
                setAuthors(data.authors);
            } catch (err) {
                console.error('Error fetching authors:', err);
            }
        };

        fetchAuthors();
    }, [id]);

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this book?');
        if (!confirmed) return;

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3000/api/library/book?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setIsDeleted(true);
                navigate('/books');
            } else {
                throw new Error('Failed to delete the book');
            }
        } catch (err) {
            setDeleteError('Error deleting the book');
            console.error(err);
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (isDeleted) {
        return <p>The book has been deleted successfully.</p>;
    }

    return (
        <div>
            {book ? (
                <>
                    <h1>{book.name}</h1>
                    <p>Published on: {new Date(book.publish_date).toLocaleDateString()}</p>

                    <h3>Author{authors.length > 1 ? ("s") : ("")}</h3>
                    {authors.length > 0 ? (
                        <ul>
                            {authors.map((author) => (
                                <li key={author.id}>
                                    <a href={`/authors/${author.id}`}>
                                        {author.first_name} {author.last_name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No authors associated with this book.</p>
                    )}

                    <br/>
                    {deleteError && <p style={{color: 'red'}}>{deleteError}</p>}
                    <hr/>
                    <a href={`/books/update/${book.id}`}><p>Change book</p></a>
                    <hr/>
                    <button id="deleteBookButton" className={style.deleteButton} onClick={handleDelete}>
                        Delete book
                    </button>
                    <br/>
                </>
            ) : (
                <p>Book not found.</p>
            )}

            <hr/>
            <a href="/books"><p>Books list</p></a>
        </div>
    );
};

export default Book;
