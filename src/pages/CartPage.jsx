import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCartItems, selectCartTotal, clearCart,
} from '../store/cartSlice';
import CartItem from '../components/CartItem';
import styles from './CartPage.module.css';

export default function CartPage() {
  const dispatch = useDispatch();
  const items    = useSelector(selectCartItems);
  const total    = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🛒</div>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyDesc}>Looks like you haven't added anything yet.</p>
            <Link to="/" className="btn btn-accent">Start shopping</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.heading}>Shopping Cart</h1>
          <button
            className="btn btn-ghost"
            onClick={() => dispatch(clearCart())}
            style={{ fontSize: 13 }}
          >
            Clear cart
          </button>
        </div>

        <div className={styles.layout}>
          {/* Items */}
          <section className={styles.itemsCol}>
            {items.map((item) => <CartItem key={item.id} item={item} />)}
          </section>

          {/* Summary */}
          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryLines}>
              {items.map((item) => (
                <div key={item.id} className={styles.summaryLine}>
                  <span>{item.title} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className={styles.divider} />

            <div className={styles.totalRow}>
              <span>Total</span>
              <span className={styles.totalAmt}>${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="btn btn-accent"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
            >
              Proceed to Checkout →
            </Link>
            <Link
              to="/"
              className="btn btn-outline"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
