import {useEffect, useState} from 'react';
import styles from './bookForm.module.css';
import {useNavigate} from 'react-router-dom';

const url = 'http://localhost:3000/api/library/book/';
const authorsUrl = 'http://localhost:3000/api/library/authors/';

function AddBookForm() {
    const [name, setName] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const navigate = useNavigate();

    const buildQueryParams = (params) => {
        return new URLSearchParams(params).toString();
    };

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch(authorsUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch authors');
                }
                const data = await response.json();
                setAuthors(data.authors);
            } catch (err) {
                console.error('Error:', err);
            }
        };

        fetchAuthors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            name,
            publishDate,
        };

        const queryParams = buildQueryParams(bookData);
        const fullUrl = `${url}?${queryParams}`;

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const result = await response.json();
                const bookId = result.newBook[0].id;

                await Promise.all(selectedAuthors.map(async (author) => {
                    const authorUrl = `http://localhost:3000/api/library/books/${bookId}/authors/${author}`;
                    const authorResponse = await fetch(authorUrl, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!authorResponse.ok) {
                        console.error(`Failed to associate author with ID: ${author}`);
                    }
                }));

                navigate('/books');
            } else {
                console.error('Failed to add book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleCheckboxChange = (author) => {
        if (selectedAuthors.includes(author)) {
            setSelectedAuthors(selectedAuthors.filter((a) => a !== author));
        } else {
            setSelectedAuthors([...selectedAuthors, author]);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.bookForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Book Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                        placeholder="Enter book name"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="publish_date" className={styles.label}>Publish Date</label>
                    <input
                        type="date"
                        id="publish_date"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <hr/>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Authors</label>
                    {authors.map((author) => (
                        <div key={author.id}>
                            <input
                                type="checkbox"
                                id={author.id}
                                checked={selectedAuthors.includes(author.id)} // Controlled checkbox
                                onChange={() => handleCheckboxChange(author.id)}
                            />
                            <label htmlFor={author.id}>{author.first_name} {author.last_name}</label>
                        </div>
                    ))}
                </div>
                <hr/>
                <button type="submit" className={styles.submitBtn}>Add Book</button>
            </form>
            <br/>
            <a href={`/books`}><p>Return to books list page</p></a>
        </div>
    );
}

export default AddBookForm;
