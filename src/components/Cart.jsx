import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCartItems, selectCartOpen, selectCartTotal,
  closeCart, clearCart,
} from '../store/cartSlice';
import CartItem from './CartItem';
import styles from './Cart.module.css';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items    = useSelector(selectCartItems);
  const isOpen   = useSelector(selectCartOpen);
  const total    = useSelector(selectCartTotal);

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={() => dispatch(closeCart())}
      />

      {/* Drawer */}
      <aside className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Your Cart</h2>
          <div className={styles.drawerActions}>
            {items.length > 0 && (
              <button
                className="btn btn-ghost"
                onClick={() => dispatch(clearCart())}
                style={{ fontSize: 12 }}
              >
                Clear all
              </button>
            )}
            <button
              className={styles.closeBtn}
              onClick={() => dispatch(closeCart())}
              aria-label="Close cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.itemList}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span>🛍️</span>
              <p>Your cart is empty</p>
              <button
                className="btn btn-outline"
                onClick={() => dispatch(closeCart())}
                style={{ fontSize: 13 }}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span className={styles.totalAmt}>${total.toFixed(2)}</span>
            </div>
            <p className={styles.note}>Shipping & taxes calculated at checkout</p>
            <button className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleCheckout}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
