import { useEffect, useState } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h3>Seconds passed: {seconds}</h3>
            <button onClick={() => setSeconds(0)}>Clear timer</button>
        </div>
    );
}

export default Timer;