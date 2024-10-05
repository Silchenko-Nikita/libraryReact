function Main() {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div>
            <h2>Welcome to the library!</h2>
            {isLoggedIn && (
                <div>
                    <a href="/books">
                        <p>Books list</p>
                    </a>
                    <a href="/authors">
                        <p>Authors list</p>
                    </a>
                </div>
            )}
        </div>
    );
}

export default Main;
