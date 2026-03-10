import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  selectCartItems, selectCartTotal, clearCart,
} from '../store/cartSlice';
import styles from './CheckoutPage.module.css';

const INITIAL = { name: '', email: '', address: '' };

export default function CheckoutPage() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const items     = useSelector(selectCartItems);
  const total     = useSelector(selectCartTotal);

  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [placed,  setPlaced]  = useState(false);

  /* ── redirect if cart empty and order not just placed ── */
  if (!placed && items.length === 0) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.center}>
            <p>Your cart is empty.</p>
            <Link to="/" className="btn btn-accent" style={{ marginTop: 16 }}>Go shopping</Link>
          </div>
        </div>
      </main>
    );
  }

  /* ── validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Full name is required.';
    if (!form.email.trim())   e.email   = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.address.trim()) e.address = 'Delivery address is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    dispatch(clearCart());
    setPlaced(true);
  };

  /* ── Success screen ── */
  if (placed) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.success}>
            <div className={styles.checkCircle}>✓</div>
            <h1 className={styles.successTitle}>Order Placed!</h1>
            <p className={styles.successDesc}>
              Thanks, <strong>{form.name}</strong>! A confirmation will be sent to{' '}
              <strong>{form.email}</strong>.
            </p>
            <Link to="/" className="btn btn-accent">Continue Shopping</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.heading}>Checkout</h1>

        <div className={styles.layout}>
          {/* Form */}
          <section className={styles.formCard}>
            <h2 className={styles.sectionTitle}>Delivery Details</h2>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>

              <Field
                label="Full Name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Field
                label="Delivery Address"
                name="address"
                type="textarea"
                placeholder="123 Main Street, City, Country"
                value={form.address}
                onChange={handleChange}
                error={errors.address}
              />

              <button type="submit" className={`btn btn-accent ${styles.submitBtn}`}>
                Place Order — ${total.toFixed(2)}
              </button>
            </form>
          </section>

          {/* Mini order summary */}
          <aside className={styles.orderSummary}>
            <h2 className={styles.sectionTitle}>Your Order</h2>
            <div className={styles.orderItems}>
              {items.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <img src={item.thumbnail} alt={item.title} className={styles.orderThumb} />
                  <div className={styles.orderInfo}>
                    <p className={styles.orderName}>{item.title}</p>
                    <p className={styles.orderQty}>Qty: {item.quantity}</p>
                  </div>
                  <span className={styles.orderPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.orderTotal}>
              <span>Total</span>
              <span className={styles.totalNum}>${total.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ── Internal Field component ── */
function Field({ label, name, type, placeholder, value, onChange, error }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
      )}
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
}
