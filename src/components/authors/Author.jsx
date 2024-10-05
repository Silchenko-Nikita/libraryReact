import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './author.module.css';

const Author = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/library/author/${id}`);
                const data = await response.json();
                setAuthor(data.author);
            } catch (err) {
                setError('Error fetching author data');
            } finally {
                setLoading(false);
            }
        };

        fetchAuthor();
    }, [id]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/library/authors/${id}/books`);
                const data = await response.json();
                setBooks(data.books);
            } catch (err) {
                console.error('Error fetching authors:', err);
            }
        };

        fetchAuthors();
    }, [id]);

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this author?');
        if (!confirmed) return;

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3000/api/library/author?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setIsDeleted(true);
                navigate('/authors');
            } else {
                throw new Error('Failed to delete the author');
            }
        } catch (err) {
            setDeleteError('Error deleting the author');
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
        return <p>The author has been deleted successfully.</p>;
    }

    return (
        <div>
            {author ? (
                <>
                    <h1>{author.first_name} {author.last_name}</h1>
                    <p>Birthdate: {new Date(author.birthdate).toLocaleDateString()}</p>

                    <h3>Books:</h3>
                    {books.length > 0 ? (
                        <ul>
                            {books.map((book) => (
                                <li key={book.id}>
                                    <a href={`/books/${book.id}`}>
                                        {book.name}</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No books associated with this author.</p>
                    )}
                    <br/>
                    {deleteError && <p style={{color: 'red'}}>{deleteError}</p>}
                    <hr/>
                    <a href={`/authors/update/${author.id}`}><p>Change author</p></a>
                    <hr/>
                    <button id="deleteAuthorButton" className={style.deleteButton} onClick={handleDelete}>
                        Delete author
                    </button>
                    <br/>
                </>
            ) : (
                <p>Author not found.</p>
            )}

            <hr/>
            <a href="/authors"><p>Authors list</p></a>
        </div>
    );
};

export default Author;
