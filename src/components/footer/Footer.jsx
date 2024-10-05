import style from './footer.module.css';

function Footer({content}) {
    return (
        <footer className={style.footer}>
            <div>{content} | <a href="/">Home</a></div>

        </footer>
    );
}

export default Footer;
