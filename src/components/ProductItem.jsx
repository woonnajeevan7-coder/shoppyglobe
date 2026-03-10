import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import styles from './ProductItem.module.css';

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const stars = Math.round(product.rating ?? 0);
  const discount = product.discountPercentage ? Math.round(product.discountPercentage) : null;

  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      {discount && <span className={styles.badge}>−{discount}%</span>}

      <div className={styles.imgWrap}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.img}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.meta}>
          <div className={styles.stars} aria-label={`${stars} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < stars ? styles.starFill : styles.starEmpty}>★</span>
            ))}
          </div>
          <span className={styles.rating}>{product.rating?.toFixed(1)}</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button className={styles.addBtn} onClick={handleAdd} aria-label="Add to cart">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}
