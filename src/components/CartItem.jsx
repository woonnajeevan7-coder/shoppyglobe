import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import styles from './CartItem.module.css';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.row}>
      <img src={item.thumbnail} alt={item.title} className={styles.thumb} />

      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.price}>${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.qtyBtn}
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
          aria-label="Decrease"
        >−</button>
        <span className={styles.qty}>{item.quantity}</span>
        <button
          className={styles.qtyBtn}
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
          aria-label="Increase"
        >+</button>
      </div>

      <button
        className={styles.removeBtn}
        onClick={() => dispatch(removeFromCart(item.id))}
        aria-label="Remove item"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}
