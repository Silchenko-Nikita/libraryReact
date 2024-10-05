import styles from './cardItem.module.css'

function CardItem({imgSrc, title, description, price}) {
    return (
        <div className={styles.cardItem}>
            <img className={styles.image} src={imgSrc} alt={title} width="250px" height="250px" ></img>
            <h4 className={styles.title}>{title}</h4>
            <div width="250px"><p className={styles.description}>{description}</p></div>
            <p className={styles.price}>{price}</p>
        </div>
    )
}

export default CardItem
