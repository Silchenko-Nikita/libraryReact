import { Link } from 'react-router-dom';
import styles from './notFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>404 - Page Not Found</h1>
            <p className={styles.message}>The page you're looking for doesn't exist.</p>
            <Link to="/public" className={styles.link}>Go back to Home</Link>
        </div>
    );
};

export default NotFound;
