import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styles from './authorForm.module.css';

const url = 'http://localhost:3000/api/library/author/';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

function ChangeAuthorForm() {
    const {id} = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const navigate = useNavigate();

    const buildQueryParams = (params) => {
        return new URLSearchParams(params).toString();
    };

    useEffect(() => {
        const fetchAuthorData = async () => {
            try {
                const response = await fetch(`${url}${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFirstName(data.author.first_name || '');
                    setLastName(data.author.last_name || '');
                    setBirthdate(formatDate(new Date(data.author.birthdate)) || '');
                } else {
                    console.error('Failed to fetch author data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAuthorData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authorData = {
            id,
            firstName,
            lastName,
            birthdate
        };

        const token = localStorage.getItem('token');

        const queryParams = buildQueryParams(authorData);
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
                const result = await response.json();
                console.log('Author updated:', result);
                navigate('/authors');
            } else {
                console.error('Failed to update author');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.authorForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.label}>First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={styles.input}
                        placeholder="Enter author first name"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.label}>Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={styles.input}
                        placeholder="Enter author last name"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="birthdate" className={styles.label}>Publish Date</label>
                    <input
                        type="date"
                        id="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitBtn}>Update Author</button>
            </form>
            <br/>
            <a href={`/authors/${id}`}><p>Return to author page</p></a>
        </div>

    );
}

export default ChangeAuthorForm;
