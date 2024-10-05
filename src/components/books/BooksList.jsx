import { useEffect, useState } from 'react';

const url = "http://localhost:3000/api/library/books/";

function BooksList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data.books);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Books List</h1>
            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <a href={`/books/${book.id}`}><strong>{book.name}</strong></a> (Published
                            on: {new Date(book.publish_date).toLocaleDateString()})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books found.</p>
            )}
            <br/>
            <a href="/books/add"><p>Add book</p></a>
            <br/>
            <a href="/"><p>Home</p></a>
        </div>
    );
}

export default BooksList;
