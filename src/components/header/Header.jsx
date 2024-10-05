import { useNavigate } from 'react-router-dom';
import style from './header.module.css';

const Header = ({ title }) => {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const login = () => {
        navigate('/login');
    };

    return (
        <header className={style.header}>
            <h3>{title}</h3>
            {isLoggedIn ? (
                <button className={style.login_or_logout} onClick={logout}>
                    Logout
                </button>
            ) : (
                <button className={style.login_or_logout} onClick={login}>
                    Login
                </button>
            )}
        </header>
    );
};

export default Header;
