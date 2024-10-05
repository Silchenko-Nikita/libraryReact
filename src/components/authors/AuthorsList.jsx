import { useEffect, useState } from 'react';

const url = "http://localhost:3000/api/library/authors/";

function AuthorsList() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch authors');
                }
                const data = await response.json();
                setAuthors(data.authors);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Authors List</h1>
            {authors.length > 0 ? (
                <ul>
                    {authors.map((author) => (
                        <li key={author.id}>
                            <a href={`/authors/${author.id}`}><strong>{author.first_name} {author.last_name}</strong></a> (Birthdate: {new Date(author.birthdate).toLocaleDateString()})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No authors found.</p>
            )}
            <br/>
            <a href="/authors/add"><p>Add author</p></a>
            <br/>
            <a href="/"><p>Home</p></a>
        </div>
    );
}

export default AuthorsList;
