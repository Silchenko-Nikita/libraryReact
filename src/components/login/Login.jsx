import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const url = 'http://localhost:3000/api/login/';

const Login = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const buildQueryParams = (params) => {
        return new URLSearchParams(params).toString();
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            nickname,
            password,
        };

        try {
            const queryParams = buildQueryParams(loginData);
            const fullUrl = `${url}?${queryParams}`;

            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const result = await response.json();
                const token = result.token;

                localStorage.setItem('token', token);

                navigate('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to login. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="nickname" className={styles.label}>Nickname</label>
                    <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your nickname"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className={styles.submitBtn}>Login</button>
            </form>
        </div>
    );
};

export default Login;
