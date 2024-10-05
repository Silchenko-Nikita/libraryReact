import { useState } from 'react';
import styles from './authorForm.module.css';
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:3000/api/library/author/';

function AddAuthorForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const navigate = useNavigate();

    const buildQueryParams = (params) => {
        return new URLSearchParams(params).toString();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authorData = {
            firstName,
            lastName,
            birthdate,
        };

        const queryParams = buildQueryParams(authorData);
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
                console.log('Author added:', result);
                navigate('/authors');
            } else {
                console.error('Failed to add author');
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
                        placeholder="Enter author first name"
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
                <button type="submit" className={styles.submitBtn}>Add Author</button>
            </form>
            <br/>
            <a href={`/authors`}><p>Return to authors list page</p></a>
        </div>
    );
}

export default AddAuthorForm;
