import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styles from './bookForm.module.css';

const url = 'http://localhost:3000/api/library/book/';
const authorsUrl = 'http://localhost:3000/api/library/authors/';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

function ChangeBookForm() {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [authors, setAuthors] = useState([]);
    const [bookAuthors, setBookAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([])
    const navigate = useNavigate();

    const buildQueryParams = (params) => {
        return new URLSearchParams(params).toString();
    };

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch(`${url}${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setName(data.book.name || '');
                    setPublishDate(formatDate(new Date(data.book.publish_date)) || '');
                } else {
                    console.error('Failed to fetch book data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

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

        const fetchBookAuthors = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/library/books/${id}/authors`);
                if (!response.ok) {
                    throw new Error('Failed to fetch authors');
                }
                const data = await response.json();
                setBookAuthors(data.authors);
                setSelectedAuthors(data.authors.map(author => author.id)); // Set selectedAuthors once bookAuthors are fetched
            } catch (err) {
                console.error('Error:', err);
            }
        };

        fetchBookData();
        fetchAuthors();
        fetchBookAuthors();
    }, [id]);

    const handleCheckboxChange = (author) => {
        if (selectedAuthors.includes(author)) {
            setSelectedAuthors(selectedAuthors.filter((a) => a !== author));
        } else {
            setSelectedAuthors([...selectedAuthors, author]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            id,
            name,
            publishDate,
        };

        const token = localStorage.getItem('token');

        const queryParams = buildQueryParams(bookData);
        const fullUrl = `${url}?${queryParams}`;

        try {
            const response = await fetch(fullUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                await Promise.all(bookAuthors.map(async (author) => {
                    const authorUrl = `http://localhost:3000/api/library/books/${id}/authors/${author.id}`;
                    const authorResponse = await fetch(authorUrl, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!authorResponse.ok) {
                        console.error(`Failed to associate author with ID: ${author.id}`);
                    }
                }));

                await Promise.all(selectedAuthors.map(async (author) => {
                    const authorUrl = `http://localhost:3000/api/library/books/${id}/authors/${author}`;
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
                                checked={selectedAuthors.includes(author.id)}
                                onChange={() => handleCheckboxChange(author.id)}
                            />
                            <label htmlFor={author.id}>{author.first_name} {author.last_name}</label>
                        </div>
                    ))}
                </div>
                <hr/>
                <button type="submit" className={styles.submitBtn}>Update Book</button>
            </form>
            <br/>
            <a href={`/books/${id}`}><p>Return to book page</p></a>
        </div>
    );
}

export default ChangeBookForm;
